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

async function exploreAPI() {
  console.log('🔍 Explorando API de Watson Studio...\n');

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

    console.log('📋 Probando diferentes endpoints...\n');

    // 1. Probar endpoint de proyectos
    console.log('1️⃣  Probando /v2/projects...');
    try {
      const projectsResponse = await client.get('/v2/projects');
      console.log(`   ✅ Status: ${projectsResponse.status}`);
      console.log(`   📊 Proyectos encontrados: ${projectsResponse.data.results?.length || 0}`);
      if (projectsResponse.data.results && projectsResponse.data.results.length > 0) {
        projectsResponse.data.results.slice(0, 3).forEach((project, index) => {
          console.log(`      ${index + 1}. ${project.name} (${project.id})`);
        });
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
    console.log('');

    // 2. Probar endpoint específico del proyecto
    console.log('2️⃣  Probando /v2/projects/{id}...');
    try {
      const projectResponse = await client.get(`/v2/projects/${process.env.WATSON_PROJECT_ID}`);
      console.log(`   ✅ Status: ${projectResponse.status}`);
      console.log(`   📊 Proyecto: ${projectResponse.data.name || 'N/A'} (${projectResponse.data.id})`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
    console.log('');

    // 3. Probar endpoint de assets con diferentes parámetros
    console.log('3️⃣  Probando diferentes endpoints de assets...');
    
    const assetEndpoints = [
      '/v2/assets',
      `/v2/assets?project_id=${process.env.WATSON_PROJECT_ID}`,
      `/v2/projects/${process.env.WATSON_PROJECT_ID}/assets`,
      `/v2/spaces/${process.env.WATSON_SPACE_ID}/assets`
    ];

    for (let i = 0; i < assetEndpoints.length; i++) {
      const endpoint = assetEndpoints[i];
      console.log(`   ${i + 1}. ${endpoint}`);
      try {
        const response = await client.get(endpoint);
        console.log(`      ✅ Status: ${response.status}`);
        console.log(`      📊 Assets: ${response.data.results?.length || 0}`);
      } catch (error) {
        console.log(`      ❌ Error: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
      }
    }
    console.log('');

    // 4. Probar acceso directo a un asset específico
    console.log('4️⃣  Probando acceso directo a asset...');
    try {
      const assetResponse = await client.get(`/v2/assets/${process.env.WATSON_OILS_ASSET_ID}`);
      console.log(`   ✅ Status: ${assetResponse.status}`);
      console.log(`   📊 Asset: ${assetResponse.data.name || 'N/A'} (${assetResponse.data.type || 'N/A'})`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
    }
    console.log('');

    // 5. Probar diferentes endpoints de contenido
    console.log('5️⃣  Probando endpoints de contenido...');
    const contentEndpoints = [
      `/v2/assets/${process.env.WATSON_OILS_ASSET_ID}/content`,
      `/v2/assets/${process.env.WATSON_OILS_ASSET_ID}/content?project_id=${process.env.WATSON_PROJECT_ID}`,
      `/v2/assets/${process.env.WATSON_OILS_ASSET_ID}/data`,
      `/v2/assets/${process.env.WATSON_OILS_ASSET_ID}/data?project_id=${process.env.WATSON_PROJECT_ID}`
    ];

    for (let i = 0; i < contentEndpoints.length; i++) {
      const endpoint = contentEndpoints[i];
      console.log(`   ${i + 1}. ${endpoint}`);
      try {
        const response = await client.get(endpoint, { responseType: 'arraybuffer' });
        console.log(`      ✅ Status: ${response.status}`);
        console.log(`      📊 Tamaño: ${response.data.length} bytes`);
        if (response.data.length < 1000) {
          console.log(`      📄 Contenido: ${response.data.toString('utf-8').substring(0, 200)}...`);
        }
      } catch (error) {
        console.log(`      ❌ Error: ${error.response?.status} - ${error.response?.data?.message || error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

exploreAPI().catch(console.error); 