import axios from 'axios';

async function getToken() {
  try {
    const response = await axios.post(`https://api.amazon.com/auth/o2/token`, {
      client_id: process.env.CLIENT_ID,
      client_secret:process.env.CLIENT_SECRET,
      refresh_token:process.env.REFRESH_TOKEN,
      grant_type: "refresh_token",
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter token:', error.message);
    throw error;
  }
}

export default { getToken };