document.addEventListener('DOMContentLoaded', function() {
    const funcionariosSelect = document.getElementById('funcionarios');
    const form = document.querySelector('form');
    const vendasPorFuncionario = JSON.parse(localStorage.getItem('vendasPorFuncionario')) || {};
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const funcionarioSelecionado = funcionariosSelect.value;
      const dadosFuncionario = obterDadosFuncionario(funcionarioSelecionado);
      criarGrafico(dadosFuncionario);
    });
  
    function obterDadosFuncionario(funcionarioId) {
      const vendasFuncionario = vendasPorFuncionario[funcionarioId] || [];
      const dados = { 
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        valores: vendasFuncionario
      };
      return dados; 
    }
  
    function criarGrafico(dados) {
      const ctx = document.getElementById('grafico').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dados.labels,
          datasets: [{
            label: 'Valor Vendido',
            data: dados.valores,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
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
    localStorage.setItem('vendasPorFuncionario', JSON.stringify(vendasPorFuncionario));
  });
  