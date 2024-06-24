
console.log('eitem novo');
console.log('crud');

const $meuForm =document.querySelector('form');
console.log($meuForm);

$meuForm.addEventListener('submit', function criaItemController(infosDoEvento)){
    infosDoEvento.preventDefault();
    console.log('estamos')
    const $itemNoEstoque = document.querySelector('input[name"itemNoEstoque]')
}
