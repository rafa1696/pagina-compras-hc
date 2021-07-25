let form = document.forms[0];
let nome = document.getElementById("nome");
let email = document.getElementById("email");
let cep = document.getElementById("cep");
let rua = document.getElementById("rua");
let bairro = document.getElementById("bairro");
let cidade = document.getElementById("cidade");
let estado = document.getElementById("uf");
let jogo = document.getElementById("jogo");

// Função para limpar valores do formulário

function limpaInput() {
    form.reset();
}

// Funções para preencher formulário com dados do CEP

 function limpa_formulário_cep() {
     //Limpa valores do formulário de cep.
     document.getElementById('rua').value = ("");
     document.getElementById('bairro').value = ("");
     document.getElementById('cidade').value = ("");
     document.getElementById('uf').value = ("");
 }

 function meu_callback(conteudo) {
     if (!("erro" in conteudo)) {
         //Atualiza os campos com os valores.
         document.getElementById('rua').value = (conteudo.logradouro);
         document.getElementById('bairro').value = (conteudo.bairro);
         document.getElementById('cidade').value = (conteudo.localidade);
         document.getElementById('uf').value = (conteudo.uf);
     } //end if.
     else {
         //CEP não Encontrado.
         limpa_formulário_cep();
         alert("CEP não encontrado.");
     }
 }

// Função para buscar CEP na API

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

// Função que gera um objeto a partir de dados do input, e envia para localStorage

function dados() {
    // Criação de objeto
    let meuObj = {
        nome: nome.value,
        email: email.value,
        cep: cep.value,
        rua: rua.value,
        bairro: bairro.value,
        cidade: cidade.value,
        estado: estado.value,
        jogo: jogo.value
    }

    // Criação de chave e inserção no localStorage
    let key = getRandomString(6);
    localStorage.setItem(key, JSON.stringify(meuObj));

    // Alerta de sucesso e limpeza de forms e imagem
    alert("Inscrição enviada com sucesso!");
    limpaInput();
    let imagem = document.getElementsByTagName("img");
    document.getElementById("divFoto").removeChild(imagem[0]);
}



// Função para gerar valores aleatórios para identificação dos itens no localStorage

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

// Função para validar formulário

function validar() {

    if (form.nome.value == "") {
        alert("Por favor digite seu nome!");
        document.getElementById("nome").focus();
        return false;
    }
    if (form.jogo.value == "escolha") {
        alert("Por favor escolha um jogo!");
        document.getElementById("jogo").focus();
        return false;
    }
    if (form.cep.value == "") {
        alert("Por favor digite seu cep!");
        document.getElementById("cep").focus();
        return false;
    }
    if (form.email.value == "") {
        alert("Por favor digite seu email!");
        document.getElementById("email").focus();
        return false;
    } dados();
}