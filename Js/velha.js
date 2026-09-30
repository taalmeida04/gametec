let jogador = "X";

let tabuleiro = ["", "", "", "", "", "", "", "", ""];

let jogoAcabou = false;

let modo = "";


function escolherModo(escolhido) {

    modo = escolhido;

    document.getElementById("escolha").style.display = "none";

    document.getElementById("jogo").style.display = "block";
}


function jogar(posicao) {

    if (tabuleiro[posicao] != "" || jogoAcabou == true) {
        return;
    }

    tabuleiro[posicao] = jogador;

    document.getElementsByClassName("casa")[posicao].innerHTML = jogador;

    verificarVencedor();

    if (jogoAcabou == true) {
        return;
    }

    if (modo == "maquina" && jogador == "X") {

        jogador = "O";

        document.getElementById("jogador").innerHTML =
            "Vez da máquina";

        setTimeout(maquinaJogar, 500);

    } else {

        if (jogador == "X") {
            jogador = "O";
        } else {
            jogador = "X";
        }

        document.getElementById("jogador").innerHTML =
            "Vez do jogador: " + jogador;
    }
}


function maquinaJogar() {

    let posicao = encontrarJogada("O");

    // Se não puder ganhar, tenta bloquear
    if (posicao == -1) {
        posicao = encontrarJogada("X");
    }

    // Tenta pegar o meio
    if (posicao == -1 && tabuleiro[4] == "") {
        posicao = 4;
    }

    // Tenta pegar um canto
    if (posicao == -1) {

        let cantos = [0, 2, 6, 8];

        let cantosLivres = [];

        for (let i = 0; i < cantos.length; i++) {

            if (tabuleiro[cantos[i]] == "") {
                cantosLivres.push(cantos[i]);
            }
        }

        if (cantosLivres.length > 0) {

            let numero = Math.floor(
                Math.random() * cantosLivres.length
            );

            posicao = cantosLivres[numero];
        }
    }

    // Se ainda não encontrou, escolhe qualquer casa
    if (posicao == -1) {

        let casasLivres = [];

        for (let i = 0; i < tabuleiro.length; i++) {

            if (tabuleiro[i] == "") {
                casasLivres.push(i);
            }
        }

        if (casasLivres.length > 0) {

            let numero = Math.floor(
                Math.random() * casasLivres.length
            );

            posicao = casasLivres[numero];
        }
    }

    tabuleiro[posicao] = "O";

    document.getElementsByClassName("casa")[posicao].innerHTML = "O";

    verificarVencedor();

    if (jogoAcabou == true) {
        return;
    }

    jogador = "X";

    document.getElementById("jogador").innerHTML =
        "Vez do jogador: X";
}


function encontrarJogada(jogador) {

    let possibilidades = [
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < possibilidades.length; i++) {

        let a = possibilidades[i][0];
        let b = possibilidades[i][1];
        let c = possibilidades[i][2];

        // Procura uma linha onde falte apenas uma casa
        if (
            tabuleiro[a] == jogador &&
            tabuleiro[b] == jogador &&
            tabuleiro[c] == ""
        ) {
            return c;
        }

        if (
            tabuleiro[a] == jogador &&
            tabuleiro[c] == jogador &&
            tabuleiro[b] == ""
        ) {
            return b;
        }

        if (
            tabuleiro[b] == jogador &&
            tabuleiro[c] == jogador &&
            tabuleiro[a] == ""
        ) {
            return a;
        }
    }

    return -1;
}


function verificarVencedor() {

    let possibilidades = [
        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < possibilidades.length; i++) {

        let a = possibilidades[i][0];
        let b = possibilidades[i][1];
        let c = possibilidades[i][2];

        if (
            tabuleiro[a] != "" &&
            tabuleiro[a] == tabuleiro[b] &&
            tabuleiro[a] == tabuleiro[c]
        ) {

            alert("Jogador " + tabuleiro[a] + " venceu!");

            jogoAcabou = true;

            return;
        }
    }

    if (!tabuleiro.includes("")) {

        alert("Empate!");

        jogoAcabou = true;
    }
}


function reiniciar() {

    tabuleiro = ["", "", "", "", "", "", "", "", ""];

    jogador = "X";

    jogoAcabou = false;

    let casas = document.getElementsByClassName("casa");

    for (let i = 0; i < casas.length; i++) {
        casas[i].innerHTML = "";
    }

    document.getElementById("jogador").innerHTML =
        "Vez do jogador: X";
}