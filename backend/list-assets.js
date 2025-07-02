require('dotenv').config();
const axios = require('axios');

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

async function listAssets() {
  console.log('🔍 Listando assets disponibles en Watson Studio...\n');

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

    // Obtener información del proyecto
    console.log('📋 Información del proyecto:');
    const projectResponse = await client.get(`/v2/projects/${process.env.WATSON_PROJECT_ID}`);
    console.log(`   Nombre: ${projectResponse.data.name || 'N/A'}`);
    console.log(`   ID: ${projectResponse.data.id}`);
    console.log(`   Tipo: ${projectResponse.data.type || 'N/A'}`);
    console.log('');

    // Listar todos los assets del proyecto
    console.log('📦 Assets disponibles en el proyecto:');
    const assetsResponse = await client.get(`/v2/assets?project_id=${process.env.WATSON_PROJECT_ID}`);
    
    if (assetsResponse.data.results && assetsResponse.data.results.length > 0) {
      assetsResponse.data.results.forEach((asset, index) => {
        console.log(`\n   ${index + 1}. Asset:`);
        console.log(`      ID: ${asset.id}`);
        console.log(`      Nombre: ${asset.name || 'N/A'}`);
        console.log(`      Tipo: ${asset.type || 'N/A'}`);
        console.log(`      Creado: ${asset.created_at || 'N/A'}`);
        console.log(`      Actualizado: ${asset.updated_at || 'N/A'}`);
        
        if (asset.description) {
          console.log(`      Descripción: ${asset.description}`);
        }
        
        if (asset.tags && asset.tags.length > 0) {
          console.log(`      Tags: ${asset.tags.join(', ')}`);
        }
      });
    } else {
      console.log('   No se encontraron assets en el proyecto.');
    }

    console.log('\n💡 Para usar estos assets, actualiza las variables de entorno en tu archivo .env:');
    console.log('   WATSON_OILS_ASSET_ID=<ID_del_asset_de_aceites>');
    console.log('   WATSON_GASOLINES_ASSET_ID=<ID_del_asset_de_gasolinas>');
    console.log('   WATSON_PROD_COST_PARAM_ASSET_ID=<ID_del_asset_de_parametros_costo>');
    console.log('   WATSON_MAX_PROD_PARAM_ASSET_ID=<ID_del_asset_de_parametros_maxima>');

  } catch (error) {
    console.error('❌ Error listando assets:');
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Message: ${error.response.data?.message || error.message}`);
      if (error.response.data && typeof error.response.data === 'object') {
        console.error(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
      }
    } else {
      console.error(`   Message: ${error.message}`);
    }
  }
}

listAssets().catch(console.error); 