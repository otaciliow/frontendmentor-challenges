const conta = document.getElementById('inp-conta');
const btnServ = document.querySelectorAll('.serv');
const inpServ = document.getElementById('inp-servico');
const numP = document.getElementById('inp-pessoas');
const erroMsg = document.querySelector('.erro-msg');
const resultado = document.querySelectorAll('.value');
const btnReset = document.querySelector('.reset');

conta.addEventListener('input', setValorConta);

btnServ.forEach(btn => {
    btn.addEventListener('click', setClick);
})

inpServ.addEventListener('input', setValorServ);

numP.addEventListener('input', setNumeroPessoas);

btnReset.addEventListener('click', reset);

let valorConta = 0.0; // Valor inicial
let valorServ = 0.15; // Valor inicial do serviço (botão de 15%)
let valorP = 1 // Valor padrão para a quantidade de pessoas

function validarFloat(s) { // Verifica se o valor digitado está em números e é decimal
    let rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validarInt(s) {
    let rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setValorConta() {
    if (conta.value.includes(',')) {
        conta.value = conta.value.replace(',', '.');
    }

    if (!validarFloat(conta.value)) { // Verifica se o valor digitado está em números e é decimal
        conta.value = conta.value.substring(0, conta.value.length-1); // Remove toda as partes inválidas do que foi digitado no input
    }

    valorConta = parseFloat(conta.value);

    calcularServ();
}

function setClick() {
    btnServ.forEach(btn => {
        // Remove a classe "ativa"
        btn.classList.remove('btn-active');

        // Adiciona a classe "ativa" no botão clicado
        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active');
            valorServ = parseFloat(btn.innerHTML)/100;
        }
    })

    inpServ.value = '';

    calcularServ();
}

function setValorServ() {
    if (!validarInt(inpServ.value)) { // Verifica se o valor digitado está em números e é inteiro
        inpServ.value = inpServ.value.substring(0, inpServ.value.length-1); // Remove toda as partes inválidas do que foi digitado no input
    }

    valorServ = parseFloat(inpServ.value)/100;

    btnServ.forEach(btn => {
        // Remove a classe "ativa" dos outros botões
        btn.classList.remove('btn-active');
    })

    if (inpServ.value !== '') {
        calcularServ();
    }

    console.log(inpServ);
}

function setNumeroPessoas() {
    if (!validarInt(numP.value)) { // Verifica se o valor digitado está em números e é inteiro
        numP.value = numP.value.substring(0, numP.value.length-1); // Remove toda as partes inválidas do que foi digitado no input
    }

    valorP = parseFloat(numP.value);

    if (valorP <= 0) { // exibe a mensagem de erro quando é digitado 0 no input, e após 3 segundos é ocultada novamente
        erroMsg.classList.add('exibe-erro-msg');
        setTimeout(function() {
            erroMsg.classLisst.remove('exibe-erro-msg');
        }, 3000);
    }

    calcularServ();
}

function calcularServ() {
    if (valorP >= 1) {
        let serv = valorConta * valorServ / valorP;
        let total = valorConta * (valorServ + 1) / valorP;
        resultado[0].innerHTML = `$ ${serv.toFixed(2)}`;
        resultado[1].innerHTML = `$ ${total.toFixed(2)}`;
    }
}

function reset() {
    conta.value = '0';
    setValorConta();

    btnServ[2].click();

    valorP = '1';
    setNumeroPessoas();
}