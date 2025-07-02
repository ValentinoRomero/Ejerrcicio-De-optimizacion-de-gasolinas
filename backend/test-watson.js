require('dotenv').config();
const axios = require('axios');
const csvParse = require('csv-parse/sync');

async function getAccessToken(apiKey) {
  try {
    console.log('🔑 Obteniendo token de acceso...');
    
    const response = await axios.post('https://iam.cloud.ibm.com/identity/token', 
      `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
      }
    );

    console.log('✅ Token de acceso obtenido exitosamente');
    return response.data.access_token;
  } catch (error) {
    console.error('❌ Error obteniendo token de acceso:', error.response?.data || error.message);
    throw error;
  }
}

async function testWatsonConnection() {
  console.log('🔍 Probando conexión con IBM Watson Studio...\n');

  // Verificar variables de entorno
  const requiredEnvVars = [
    'WATSON_API_KEY',
    'WATSON_PROJECT_ID', 
    'WATSON_SPACE_ID',
    'WATSON_OILS_ASSET_ID',
    'WATSON_GASOLINES_ASSET_ID',
    'WATSON_PROD_COST_PARAM_ASSET_ID',
    'WATSON_MAX_PROD_PARAM_ASSET_ID'
  ];

  console.log('📋 Verificando variables de entorno:');
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar];
    if (!value || value === 'your_' + envVar.toLowerCase() + '_here') {
      console.log(`❌ ${envVar}: NO CONFIGURADA`);
    } else {
      console.log(`✅ ${envVar}: ${envVar.includes('KEY') ? '***CONFIGURADA***' : value}`);
    }
  }
  console.log('');

  try {
    // Obtener token de acceso
    const accessToken = await getAccessToken(process.env.WATSON_API_KEY);

    // Crear cliente axios con token
  const client = axios.create({
    baseURL: 'https://api.dataplatform.cloud.ibm.com',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
  });

    // Probar conexión básica - usar la API correcta
    console.log('🌐 Probando conexión básica...');
    const response = await client.get(`/v2/projects/${process.env.WATSON_PROJECT_ID}`);
    console.log(`✅ Conexión exitosa. Proyecto: ${response.data.name || 'N/A'}\n`);

    // Probar lectura de aceites
    console.log('🛢️  Leyendo datos de aceites...');
    const aceitesResponse = await client.get(
      `/v2/assets/${process.env.WATSON_OILS_ASSET_ID}/content?project_id=${process.env.WATSON_PROJECT_ID}`,
      { responseType: 'arraybuffer' }
    );
    const aceitesCsv = aceitesResponse.data.toString('utf-8');
    const aceites = csvParse.parse(aceitesCsv, { columns: true });
    console.log(`✅ Aceites leídos: ${aceites.length} registros`);
    console.log('📊 Primeros 3 aceites:');
    aceites.slice(0, 3).forEach((aceite, index) => {
      console.log(`   ${index + 1}. ${aceite.nombre} - Octanaje: ${aceite.octanaje}, Precio: $${aceite.precio}`);
    });
    console.log('');

    // Probar lectura de gasolinas
    console.log('⛽ Leyendo datos de gasolinas...');
    const gasolinasResponse = await client.get(
      `/v2/assets/${process.env.WATSON_GASOLINES_ASSET_ID}/content?project_id=${process.env.WATSON_PROJECT_ID}`,
      { responseType: 'arraybuffer' }
    );
    const gasolinasCsv = gasolinasResponse.data.toString('utf-8');
    const gasolinas = csvParse.parse(gasolinasCsv, { columns: true });
    console.log(`✅ Gasolinas leídas: ${gasolinas.length} registros`);
    console.log('📊 Primeros 3 tipos de gasolina:');
    gasolinas.slice(0, 3).forEach((gasolina, index) => {
      console.log(`   ${index + 1}. ${gasolina.nombre} - Octanaje: ${gasolina.octanaje}, Precio: $${gasolina.precio_venta}`);
    });
    console.log('');

    // Probar lectura de parámetros de costo
    console.log('💰 Leyendo parámetros de costo...');
    const costosResponse = await client.get(
      `/v2/assets/${process.env.WATSON_PROD_COST_PARAM_ASSET_ID}/content?project_id=${process.env.WATSON_PROJECT_ID}`,
      { responseType: 'arraybuffer' }
    );
    const costosCsv = costosResponse.data.toString('utf-8');
    const costos = csvParse.parse(costosCsv, { columns: true });
    console.log(`✅ Parámetros de costo leídos: ${costos.length} registros`);
    costos.forEach((costo, index) => {
      console.log(`   ${index + 1}. ${costo.parametro}: ${costo.valor} - ${costo.descripcion}`);
    });
    console.log('');

    // Probar lectura de parámetros de producción máxima
    console.log('📈 Leyendo parámetros de producción máxima...');
    const maxProdResponse = await client.get(
      `/v2/assets/${process.env.WATSON_MAX_PROD_PARAM_ASSET_ID}/content?project_id=${process.env.WATSON_PROJECT_ID}`,
      { responseType: 'arraybuffer' }
    );
    const maxProdCsv = maxProdResponse.data.toString('utf-8');
    const maxProd = csvParse.parse(maxProdCsv, { columns: true });
    console.log(`✅ Parámetros de producción máxima leídos: ${maxProd.length} registros`);
    maxProd.forEach((param, index) => {
      console.log(`   ${index + 1}. ${param.parametro}: ${param.valor} - ${param.descripcion}`);
    });
    console.log('');

    console.log('🎉 ¡Todas las pruebas fueron exitosas! El sistema está listo para usar con Watson Studio.');

  } catch (error) {
    console.error('❌ Error durante las pruebas:');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data?.message || error.message}`);
      console.error(`   URL: ${error.config?.url}`);
      if (error.response.data) {
        console.error(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
      }
    } else {
      console.error(`   Message: ${error.message}`);
    }
    
    console.log('\n💡 Sugerencias:');
    console.log('   1. Verifica que todas las variables de entorno estén configuradas correctamente');
    console.log('   2. Asegúrate de que el API Key de Watson Studio sea válido');
    console.log('   3. Confirma que los Asset IDs correspondan a archivos CSV válidos');
    console.log('   4. Verifica que tengas permisos de lectura en el proyecto de Watson Studio');
    console.log('   5. Revisa que el Project ID y Space ID sean correctos');
  }
}

testWatsonConnection().catch(console.error); 