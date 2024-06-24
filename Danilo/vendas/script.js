document.addEventListener('DOMContentLoaded', () => {
  const salesForm = document.getElementById('sales-form');
  const salesList = document.getElementById('sales-list');
  const totalSalesPriceElement = document.getElementById('total-sales-price');
  const clearButton = document.getElementById('clear-button');
  const resetButton = document.getElementById('reset-button'); // Selecionar o botão de reiniciar
  const productInput = document.getElementById('product');
  const dataList = document.getElementById('products');
  const dateInput = document.getElementById('date'); // Selecionar o campo de data
  let totalSalesPrice = 0; // Variável para armazenar o preço total de todas as vendas

  // Preencher a lista de produtos no carregamento da página
  populateProductList();

  // Função para atualizar a data atual no campo de data
  function updateCurrentDate() {
      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().split('T')[0];
      dateInput.value = currentDateString;
  }

  // Atualizar a data ao carregar a página
  updateCurrentDate();

  salesForm.addEventListener('submit', e => {
      e.preventDefault();

      const date = dateInput.value; // Obter a data do campo
      const product = productInput.value.trim();
      const quantity = parseInt(document.getElementById('quantity').value);
      const price = parseFloat(document.getElementById('price').value);

      if (date.trim() && product.trim() && quantity && price) {
          const totalPrice = quantity * price; // Calcula o preço total
          addSale(date, product, quantity, price, totalPrice);
          totalSalesPrice += totalPrice; // Adiciona o preço total da venda à variável
          updateTotalSalesPrice(); // Atualiza o preço total de todas as vendas na tela
          // Limpa os campos do formulário após adicionar a venda
          salesForm.reset();
          updateCurrentDate(); // Atualizar a data após finalizar a compra
      } else {
          alert('Por favor, preencha todos os campos corretamente.');
      }
  });

  clearButton.addEventListener('click', () => {
      // Limpa a lista de vendas e redefine o preço total para zero
      salesList.innerHTML = '';
      totalSalesPrice = 0;
      updateTotalSalesPrice();
      updateCurrentDate(); // Atualizar a data após limpar as vendas
  });

  resetButton.addEventListener('click', () => {
      // Reinicia o formulário
      salesForm.reset();
      updateCurrentDate(); // Atualizar a data após reiniciar o formulário
  });

  function addSale(date, product, quantity, price, totalPrice) {
      const saleItem = document.createElement('div');
      saleItem.classList.add('sale');
      saleItem.innerHTML = `
          <p><strong>Data:</strong> ${date}</p>
          <p><strong>Produto:</strong> ${product}</p>
          <p><strong>Quantidade:</strong> ${quantity}</p>
          <p><strong>Preço Unitário:</strong> R$ ${price.toFixed(2)}</p>
          <p><strong>Preço Total:</strong> R$ ${totalPrice.toFixed(2)}</p>
          <hr>
      `;
      salesList.appendChild(saleItem);

      // Atualizar a quantidade disponível do produto no localStorage
      updateProductQuantity(product, quantity);

      // Adicionar o produto à lista de opções do datalist
      const option = document.createElement('option');
      option.value = product;
      dataList.appendChild(option);
  }

  function updateTotalSalesPrice() {
      totalSalesPriceElement.textContent = `Preço Total de Todas as Vendas: R$ ${totalSalesPrice.toFixed(2)}`;
  }

  function populateProductList() {
      const products = [
          { name: 'Brahma garrafa 600ml', quantity: 50 },
          { name: 'Brahma lata 350ml', quantity: 50 },
          { name: 'Budweiser Garrafa 600ML', quantity: 50 },
          { name: 'Budweiser Lata 350ML', quantity: 50 },
          { name: 'Skol Garrafa 1 Litro', quantity: 50 },
          { name: 'Skol Lata 350ML', quantity: 50 },
          { name: 'Heineken Garrafa 600Ml', quantity: 50 },
          { name: 'Heineken Lata 350ML', quantity: 50 },
          { name: 'Coca-Cola 2 Litros', quantity: 50 },
          { name: 'Coca-Cola 500Ml', quantity: 50 },
          { name: 'Fanta Laranja 2 Litros', quantity: 50 },
          { name: 'Fanta Uva 2 Litros', quantity: 50 },
          { name: 'Guaraná Antártica 2 Litros', quantity: 50 },
          { name: 'Sprit 2 Litros', quantity: 50 },
          { name: 'Pepsi 2 Litros', quantity: 50 },
          { name: 'Pepsi 500ML', quantity: 50 }
      ];

      // Salvar a lista de produtos no localStorage
      localStorage.setItem('products', JSON.stringify(products));

      // Preencher a lista de opções do datalist
      products.forEach(product => {
          const option = document.createElement('option');
          option.value = product.name;
          dataList.appendChild(option);
      });
  }

  function updateProductQuantity(product, soldQuantity) {
      let products = JSON.parse(localStorage.getItem('products')) || [];

      // Procurar o produto no localStorage
      const productIndex = products.findIndex(p => p.name === product);

      // Se o produto for encontrado, deduzir a quantidade vendida
      if (productIndex !== -1) {
          products[productIndex].quantity -= soldQuantity;
          localStorage.setItem('products', JSON.stringify(products));
      }
  }
});



