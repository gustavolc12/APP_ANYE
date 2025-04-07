import Token from './api/token.js';
import Orders from './api/orders.js';
import Table from 'cli-table3';
import './config/index.js';

async function main() {
  try {
    const token = await Token.getToken();
    console.log('Token obtido:', token);
    
    const data = await Orders.getAllOrders(token);
    const orders = data.payload.Orders;

    // Cria a tabela com os campos desejados
    const table = new Table({
      head: [
        'Status',
        'ID do Pedido',
        'Data do Pedido',
        'Nome do Comprador',
        'Total do Pedido',
        'Taxa',
        'Frete',
        'Nome do Produto',
        'ASIN',
        'Quantidade',
        'SKU',
        'Taxa Item',
        'Dimensões'
      ],
      style: { head: [], border: [] } // Desabilita estilos ANSI
    });
    
    // Itera por cada pedido
    for (const order of orders) {
      // Busca os itens do pedido para o orderId atual
      const orderItemsResponse = await Orders.getOrderItems(token, order.AmazonOrderId);
      const orderItems = orderItemsResponse.payload.OrderItems;

      // Para cada item do pedido, adiciona uma linha na tabela
      orderItems.forEach(item => {
        table.push([
          order.OrderStatus,
          order.AmazonOrderId,
          order.PurchaseDate,
          order.BuyerInfo?.BuyerEmail || 'N/A',
          order.OrderTotal?.Amount || 'N/A',
          'N/A', // Taxa (não disponível na resposta original)
          'N/A', // Frete (não disponível na resposta original)
          item.Title || 'N/A',           // Nome do produto
          item.ASIN || 'N/A',            // ASIN
          item.QuantityOrdered || 'N/A', // Quantidade
          item.SellerSKU || 'N/A',       // SKU
          item.ItemTax?.Amount || 'N/A', // Taxa do item
          'N/A'                        // Dimensões (não disponível na resposta original)
        ]);
      });
    }

    // Imprime a tabela sem caracteres ANSI
    console.log(table.toString());
  } catch (error) {
    console.error('Erro na aplicação:', error);
  }
}

main();
