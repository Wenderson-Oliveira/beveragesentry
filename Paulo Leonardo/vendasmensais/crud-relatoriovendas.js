
   document.addEventListener('DOMContentLoaded', function() {
    const funcionariosSelect = document.getElementById('funcionarios');
    const form = document.querySelector('form');
    const funcionariosData = {}; 
    let vendasPorFuncionario = JSON.parse(localStorage.getItem('vendasPorFuncionario')) || {};
  
    carregarFuncionarios();
  
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const funcionarioSelecionado = funcionariosSelect.value;
        const dadosFuncionario = obterDadosFuncionario(funcionarioSelecionado);
        criarGrafico(dadosFuncionario);
    });
  
    
    form.addEventListener('submit', adicionarFuncionario);
  
    
    function carregarFuncionarios() {
        
        const funcionarios = [
            {id: 0, nome: ''},
            { id: 1, nome: 'Amanda Nunes'},
            { id: 2, nome: 'Pedro Rodrigues'},
            { id: 3, nome: 'Tobias Martins'},
            { id: 4, nome: 'Leila Pereira'},
            { id: 5, nome: 'João Pedro'},
        ];
  
        funcionarios.forEach(funcionario => {
            funcionariosData[funcionario.id] = funcionario;
            const option = document.createElement('option');
            option.text = funcionario.nome;
            option.value = funcionario.id;
            funcionariosSelect.add(option);
        });
    }
  
    function obterDadosFuncionario(funcionarioId) {
      
            const dados = { 
            labels: ['Janeiro', 'Fevereiro', 'Março', 'abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            valores: [50000, 10500, 12000, 20000, 18050]
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
  
    
    function adicionarFuncionario(event) {
        event.preventDefault();
        const novoFuncionarioNome = prompt('Digite o nome do novo funcionário:');
        if (novoFuncionarioNome) {
            const novoFuncionarioId = Object.keys(funcionariosData).length + 1; 
            const novoFuncionario = { id: novoFuncionarioId, nome: novoFuncionarioNome };
            funcionariosData[novoFuncionarioId] = novoFuncionario;
            const option = document.createElement('option');
            option.text = novoFuncionario.nome;
            option.value = novoFuncionario.id;
            funcionariosSelect.add(option);
        }
    }
  
    
    function removerFuncionario() {
        const funcionarioSelecionadoId = funcionariosSelect.value;
        delete funcionariosData[funcionarioSelecionadoId];
        funcionariosSelect.remove(funcionariosSelect.selectedIndex);
    }
  });
  