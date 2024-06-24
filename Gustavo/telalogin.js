function logar (){

    var login = document.getElementById('login').value;
    var senha =document.getElementById('senha').value;

    if(login == "admin@admin.com" && senha == "admin"){
        alert('Comece a gerênciar seu estoque!');
        location.href = "../Jaimir/pjt-estoque/estoque.html";
    } else{
        alert('Usuário ou Senha incorretos!');
    }
} 