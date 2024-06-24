
document.addEventListener('DOMContentLoaded', () => {
    const productNameSelect = document.getElementById('productName');
    const quantityInput = document.getElementById('quantity');
    const salesForm = document.getElementById('salesForm');
    const salesList = document.getElementById('salesList');

    populateProductOptions();

    loadSales();

    salesForm.addEventListener('submit', event => {
        event.preventDefault();
        const productName = productNameSelect.value;
        const quantity = parseInt(quantityInput.value, 10);

        if (isNaN(quantity) || quantity <= 0) {
            alert('Por favor, insira uma quantidade válida.');
            return;
        }

        registerSale(productName, quantity);
    });

    function populateProductOptions() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item.name;
            productNameSelect.appendChild(option);
        });
    }

    function registerSale(productName, quantity) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        let updated = false;
        items = items.map(item => {
            if (item.name === productName) {
                item.sold += quantity;
                updated = true;
            }
            return item;
        });

        if (!updated) {
            items.push({ name: productName, sold: quantity });
        }

        localStorage.setItem('items', JSON.stringify(items));

        alert(`Venda registrada para o produto: ${productName}, quantidade: ${quantity}`);

        quantityInput.value = '';

        updateSalesSummary(productName, quantity);
    }

    function loadSales() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach(item => {
            updateSalesSummary(item.name, item.sold);
        });

        const salesData = items.reduce((acc, item) => {
            acc[item.name] = item.sold;
            return acc;
        }, {});
        drawChart(salesData);
    }

    function updateSalesSummary(productName, quantity) {
        let listItem = document.querySelector(`#salesList li[data-product="${productName}"]`);
        if (!listItem) {
            listItem = document.createElement('li');
            listItem.dataset.product = productName;
            salesList.appendChild(listItem);
        }
        listItem.textContent = `Vendeu ${quantity} unidades de ${productName}`;
    }

    function drawChart(data) {
        const productNames = Object.keys(data);
        const quantitiesSold = Object.values(data);
        const ctx = document.getElementById('salesChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: productNames,
                datasets: [{
                    label: 'Quantidade Vendida',
                    data: quantitiesSold,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});



