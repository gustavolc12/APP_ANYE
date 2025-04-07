import axios from 'axios';

function getFormattedDate() {
  return new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}


async function getAllOrders(token, nextToken) {

  try {
    const parametros = {
      MarketplaceIds: "A2Q3Y263D00KWC",
      CreatedAfter: "2020-10-10",
      MaxResultsPerPage: "20"
    }
    if(nextToken){
      parametros = {nextToken}
    }
    const response = await axios.get(`https://sellingpartnerapi-na.amazon.com/orders/v0/orders`, {
      headers: { 
        'Content-Type': 'application/json',
        "x-amz-access-token": token,
        "x-amzn-RateLimit-Limit": 100,
        "x-amz-date": getFormattedDate()
      },
      params: parametros
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
    throw error.content;
  }
}

async function getOrderItems(token, orderId) {

  try {

    const response = await axios.get(`https://sellingpartnerapi-na.amazon.com/orders/v0/orders/` + orderId + "/orderItems", {
      headers: { 
        'Content-Type': 'application/json',
        "x-amz-access-token": token,
        "x-amzn-RateLimit-Limit": 100,
        "x-amz-date": getFormattedDate()
      },
      params: {
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
    throw error.content;
  }

}
export default { getAllOrders, getOrderItems};