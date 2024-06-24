let salesData = [];
let salesValueData = [];
for (let i = 0; i < 12; i++) {
    let sales = Math.floor(Math.random() * 1000);
    salesData.push(sales);
    // Gera um valor de venda aleatório entre R$1.000,00 e R$50.000,00 para cada mês
    // O valor é arredondado para duas casas decimais para representar centavos
    let salesValue = (Math.random() * (50000 - 1000) + 1000).toFixed(2);
    salesValueData.push(salesValue);
}

// Cria o gráfico de vendas
let ctx = document.getElementById('salesChart').getContext('2d');
let salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
            label: 'Valor das Vendas (R$)',
            data: salesValueData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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

/// Atualiza o gráfico quando o botão de busca é clicado
document.getElementById('searchButton').addEventListener('click', function() {
    let startDate = new Date(document.getElementById('startDate').value);
    let endDate = new Date(document.getElementById('endDate').value);
    if (startDate > endDate) {
        alert('A data de início deve ser anterior à data de término.');
        return;
    }
    // Armazena as datas de início e fim no localStorage
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);

    let startMonth = startDate.getMonth();
    let endMonth = endDate.getMonth();
    let filteredData = [];
    if (startMonth === endMonth) {
        // Se a data de início e fim são do mesmo mês, inclui apenas os dados desse mês
        filteredData.push(salesValueData[startMonth]);
    } else {
        for (let i = startMonth; i <= endMonth; i++) {
            filteredData.push(salesValueData[i]);
        }
    }
    salesChart.data.datasets[0].data = filteredData;
    salesChart.update();
});

// Limpa a pesquisa e retorna o gráfico para a situação inicial quando o botão de limpar é clicado
document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    // Limpa as datas de início e fim do localStorage
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');

    salesChart.data.datasets[0].data = salesValueData;
    salesChart.update();
});

// Quando a página é carregada, verifica se há datas de início e fim armazenadas no localStorage
// Se houver, atualiza os campos de data e o gráfico
window.onload = function() {
    let storedStartDate = localStorage.getItem('startDate');
    let storedEndDate = localStorage.getItem('endDate');
    if (storedStartDate && storedEndDate) {
        document.getElementById('startDate').value = storedStartDate;
        document.getElementById('endDate').value = storedEndDate;
        let startMonth = new Date(storedStartDate).getMonth();
        let endMonth = new Date(storedEndDate).getMonth();
        let filteredData = [];
        if (startMonth === endMonth) {
            filteredData.push(salesValueData[startMonth]);
        } else {
            for (let i = startMonth; i <= endMonth; i++) {
                filteredData.push(salesValueData[i]);
            }
        }
        salesChart.data.datasets[0].data = filteredData;
        salesChart.update();
    }
};

// Limpa a pesquisa e retorna o gráfico para a situação inicial quando o botão de limpar é clicado
document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    salesChart.data.datasets[0].data = salesValueData;
    salesChart.update();
});
