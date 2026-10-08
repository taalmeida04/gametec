// Variáveis principais do jogo
let jogador = "X";

let tabuleiro = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let jogoAcabou = false;

let modo = "";


// Elementos do HTML
let escolha = document.getElementById("escolha");
let jogo = document.getElementById("jogo");
let jogadorTexto = document.getElementById("jogador");
let casas = document.getElementsByClassName("casa");
let resultado = document.getElementById("resultado");
let resultadoTitulo = document.getElementById("resultadoTitulo");
let resultadoMensagem = document.getElementById("resultadoMensagem");
let botaoMaquina = document.getElementById("botaoMaquina");
let botaoAmigo = document.getElementById("botaoAmigo");
let botaoReiniciar = document.getElementById("botaoReiniciar");
let jogarNovamente = document.getElementById("jogarNovamente");


// Escolhe entre jogar contra a máquina ou contra outro jogador
botaoMaquina.addEventListener("click", function () {
    escolherModo("maquina");
});

botaoAmigo.addEventListener("click", function () {
    escolherModo("2jogadores");
});

function escolherModo(escolhido) {
    modo = escolhido;
    escolha.style.display = "none";
    jogo.style.display = "block";
}


// Detecta quando uma casa é clicada
for (let i = 0; i < casas.length; i++) {
    casas[i].addEventListener("click", function () {
        jogar(i);
    });
}


// Faz a jogada do jogador
function jogar(posicao) {

    // Impede jogar em uma casa ocupada ou depois do fim do jogo
    if (tabuleiro[posicao] != "" || jogoAcabou == true) {
        return;
    }

    tabuleiro[posicao] = jogador;
    casas[posicao].innerHTML = jogador;

    // Verifica se a jogada terminou o jogo
    verificarVencedor();

    if (jogoAcabou == true) {
        return;
    }

    // Se estiver jogando contra a máquina
    if (modo == "maquina" && jogador == "X") {
        jogador = "O";
        jogadorTexto.innerHTML = "Vez da máquina";
        setTimeout(maquinaJogar, 500);
    }

    else {
        // Alterna entre X e O
        if (jogador == "X") {
            jogador = "O";
        }
        else {
            jogador = "X";
        }

        jogadorTexto.innerHTML =
            "Vez do jogador: " + jogador;
    }
}


// Jogada da máquina
function maquinaJogar() {

    // Tenta ganhar ou bloquear o jogador
    let posicao = encontrarJogada("O");

    if (posicao == -1) {
        posicao = encontrarJogada("X");
    }

    // Tenta ocupar o centro
    if (posicao == -1 && tabuleiro[4] == "") {
        posicao = 4;
    }

    // Tenta ocupar um canto
    if (posicao == -1) {

        let cantos = [0, 2, 6, 8];
        let cantosLivres = [];

        for (let i = 0; i < cantos.length; i++) {
            if (tabuleiro[cantos[i]] == "") {
                cantosLivres.push(cantos[i]);
            }
        }

        if (cantosLivres.length > 0) {
            let numero =
                Math.floor(
                    Math.random() * cantosLivres.length
                );

            posicao = cantosLivres[numero];
        }
    }

    // Escolhe qualquer casa livre
    if (posicao == -1) {

        let casasLivres = [];

        for (let i = 0; i < tabuleiro.length; i++) {
            if (tabuleiro[i] == "") {
                casasLivres.push(i);
            }
        }

        if (casasLivres.length > 0) {
            let numero =
                Math.floor(
                    Math.random() * casasLivres.length
                );

            posicao = casasLivres[numero];
        }
    }

    tabuleiro[posicao] = "O";
    casas[posicao].innerHTML = "O";

    verificarVencedor();

    if (jogoAcabou == true) {
        return;
    }

    jogador = "X";
    jogadorTexto.innerHTML = "Vez do jogador: X";
}


// Procura uma jogada que pode completar uma sequência de três
function encontrarJogada(jogadorAtual) {

    let possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < possibilidades.length; i++) {

        let a = possibilidades[i][0];
        let b = possibilidades[i][1];
        let c = possibilidades[i][2];

        if (
            tabuleiro[a] == jogadorAtual &&
            tabuleiro[b] == jogadorAtual &&
            tabuleiro[c] == ""
        ) {
            return c;
        }

        if (
            tabuleiro[a] == jogadorAtual &&
            tabuleiro[c] == jogadorAtual &&
            tabuleiro[b] == ""
        ) {
            return b;
        }

        if (
            tabuleiro[b] == jogadorAtual &&
            tabuleiro[c] == jogadorAtual &&
            tabuleiro[a] == ""
        ) {
            return a;
        }
    }

    return -1;
}


// Verifica se existe vencedor ou empate
function verificarVencedor() {

    let possibilidades = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < possibilidades.length; i++) {

        let a = possibilidades[i][0];
        let b = possibilidades[i][1];
        let c = possibilidades[i][2];

        // Verifica se os três espaços possuem o mesmo jogador
        if (
            tabuleiro[a] != "" &&
            tabuleiro[a] == tabuleiro[b] &&
            tabuleiro[a] == tabuleiro[c]
        ) {

            mostrarResultado(
                "VITÓRIA!",
                "Jogador " + tabuleiro[a] + " venceu!"
            );

            jogoAcabou = true;

            return;
        }
    }

    // Se não houver espaços vazios, o jogo terminou empatado
    if (!tabuleiro.includes("")) {

        mostrarResultado(
            "EMPATE!",
            "Ninguém venceu dessa vez."
        );

        jogoAcabou = true;
    }
}


// Mostra o resultado na tela
function mostrarResultado(titulo, mensagem) {

    resultadoTitulo.innerHTML = titulo;
    resultadoMensagem.innerHTML = mensagem;
    resultado.style.display = "flex";
}


// Botões para reiniciar o jogo
botaoReiniciar.addEventListener("click", function () {
    reiniciar();
});

jogarNovamente.addEventListener("click", function () {
    resultado.style.display = "none";
    reiniciar();
});


function reiniciar() {

    // Limpa o tabuleiro e reinicia o jogador
    tabuleiro = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    jogador = "X";
    jogoAcabou = false;

    // Limpa as casas do tabuleiro
    for (let i = 0; i < casas.length; i++) {
        casas[i].innerHTML = "";
    }

    jogadorTexto.innerHTML =
        "Vez do jogador: X";
}