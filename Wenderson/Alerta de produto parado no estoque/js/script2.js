document.addEventListener('DOMContentLoaded', function() {
    


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
         
         const estoqueDadosElemento = document.getElementById('estoque-dados');
         estoqueDadosElemento.innerHTML = '';

       
         const ul = document.createElement('ul');

         
         const produtosNaoRemovidos = [];

       
         for (const produto in estoque) {
             if (estoque.hasOwnProperty(produto)) {
                 
                 const ultimaRemocao = parseInt(localStorage.getItem(produto + '-remocao') || 0);
                 const agora = new Date().getTime();
                 const umMinuto = 60 * 1000; 

                 if (!estoque[produto] || agora - ultimaRemocao > umMinuto) {
                     
                     produtosNaoRemovidos.push(produto);
                 }

                 
                 const li = document.createElement('li');
                 li.textContent = `${produto}: ${estoque[produto]} unidades`;

                
                 ul.appendChild(li);
             }
         }

         
         estoqueDadosElemento.appendChild(ul);

         
         if (produtosNaoRemovidos.length > 0) {
             alert(`Os seguintes produtos estão parados há mais de 1 minuto: ${produtosNaoRemovidos.join(', ')}`);
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




