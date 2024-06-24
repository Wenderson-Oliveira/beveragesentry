document.addEventListener('DOMContentLoaded', function() {

    function atualizarQuantidades() {
        const estoqueInicial = {
            "Cola Cola 2 litros": 0,
            "Cola Cola 500ml": 0,
            "Fanta uva 2 litros": 0,
            "Fanta laranja 2 litros": 0,
            "Guaraná Antártica 2 litros": 0,
            "Guaraná Antártica 500ml": 0,
            "Brahma 600ml": 0,
            "Skol 600ml": 0,
            "Heineken 600ml": 0,
            "Red Bull 250ml": 0, 
            "Red Bull Tropical 250ml": 0,
            "Gatorade Laranja 500ml": 0,
            "Gatorade Morango 500ml": 0,
            "Monster 473ml": 0,
            "Monster Juice 473ml": 0
        };

        const estoqueArmazenado = localStorage.getItem('estoque');
        const estoque = estoqueArmazenado ? JSON.parse(estoqueArmazenado) : estoqueInicial;

        const produtosElementos = document.querySelectorAll('.produto');

        produtosElementos.forEach(produto => {
            const nomeProduto = produto.getAttribute('data-produto');
            const quantidadeSpan = produto.querySelector('.quantidade');
            quantidadeSpan.textContent = estoque[nomeProduto] + ' unidades';
        });
    }

    atualizarQuantidades();

    const botoesAdicionar = document.querySelectorAll('.adicionar-btn');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function() {
            const produto = this.parentNode.getAttribute('data-produto');
            const estoqueArmazenado = localStorage.getItem('estoque');
            const estoque = estoqueArmazenado ? JSON.parse(estoqueArmazenado) : {};

            estoque[produto] = (estoque[produto] || 0) + 1;

            localStorage.setItem('estoque', JSON.stringify(estoque));

            atualizarQuantidades();

            atualizarUltimaRemocao(produto);
        });
    });

    const botoesRemover = document.querySelectorAll('.remover-btn');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', function() {
            const produto = this.parentNode.getAttribute('data-produto');
            const estoqueArmazenado = localStorage.getItem('estoque');
            const estoque = estoqueArmazenado ? JSON.parse(estoqueArmazenado) : {};

            if (estoque[produto] && estoque[produto] > 0) {
                estoque[produto] -= 1;
                localStorage.setItem('estoque', JSON.stringify(estoque));
                atualizarQuantidades();
                atualizarUltimaRemocao(produto);
            }
        });
    });

    function exibirDadosEstoque() {
        const estoque = JSON.parse(localStorage.getItem('estoque'));

        if (estoque) {
            const agora = new Date().getTime();
            const umMinuto = 120 * 1000; // 1 minuto em milissegundos

            for (const produto in estoque) {
                if (estoque.hasOwnProperty(produto)) {
                    const ultimaRemocao = parseInt(localStorage.getItem(produto + '-remocao') || 0);

                    if (!estoque[produto] || agora - ultimaRemocao > umMinuto) {
                        alert(`O produto ${produto} está parado há mais de 2 minutos.`);
                    }
                }
            }
        }
    } 

    exibirDadosEstoque();

    window.addEventListener('storage', function() {
        exibirDadosEstoque();
    });

    function atualizarUltimaRemocao(produto) {
        const agora = new Date().getTime();
        localStorage.setItem(produto + '-remocao', agora);
    }

});


