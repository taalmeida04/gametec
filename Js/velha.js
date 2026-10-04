let jogador = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogoAcabou = false;
let modo = "";

// escolhe se o jogo será contra a máquina ou outro jogador
function escolherModo(escolhido) {
    modo = escolhido;
    document.getElementById("escolha").style.display = "none";
    document.getElementById("jogo").style.display = "block";
}

// faz a jogada do jogador
function jogar(posicao) {
    // impede jogar em uma casa ocupada ou depois do fim do jogo
    if (tabuleiro[posicao] != "" || jogoAcabou == true) {
        return;
    }
    // coloca o símbolo na posição escolhida
    tabuleiro[posicao] = jogador;
    document.getElementsByClassName("casa")[posicao].innerHTML = jogador;
    verificarVencedor();
    // para se alguém já venceu ou deu empate
    if (jogoAcabou == true) {
        return;
    }
    // chama a máquina depois da jogada do jogador
    if (modo == "maquina" && jogador == "X") {
        jogador = "O";
        document.getElementById("jogador").innerHTML = "Vez da máquina";
        setTimeout(maquinaJogar, 500);
    } else {
        // troca a vez entre X e O
        if (jogador == "X") {
            jogador = "O";
        } else {
            jogador = "X";
        }
        document.getElementById("jogador").innerHTML = "Vez do jogador: " + jogador;
    }
}

// faz a jogada da máquina
function maquinaJogar() {
    // primeiro tenta encontrar uma jogada para vencer
    let posicao = encontrarJogada("O");

    // se não puder ganhar, tenta bloquear o jogador
    if (posicao == -1) {
        posicao = encontrarJogada("X");
    }

    // tenta pegar o meio do tabuleiro
    if (posicao == -1 && tabuleiro[4] == "") {
        posicao = 4;
    }

    // tenta pegar um dos cantos
    if (posicao == -1) {
        let cantos = [0, 2, 6, 8];
        let cantosLivres = [];
        for (let i = 0; i < cantos.length; i++) {
            if (tabuleiro[cantos[i]] == "") {
                cantosLivres.push(cantos[i]);
            }
        }
        // escolhe um canto livre aleatoriamente
        if (cantosLivres.length > 0) {
            let numero = Math.floor(Math.random() * cantosLivres.length);
            posicao = cantosLivres[numero];
        }
    }

    // se ainda não encontrou uma jogada, escolhe qualquer casa livre
    if (posicao == -1) {
        let casasLivres = [];
        for (let i = 0; i < tabuleiro.length; i++) {
            if (tabuleiro[i] == "") {
                casasLivres.push(i);
            }
        }
        // escolhe uma casa livre aleatoriamente
        if (casasLivres.length > 0) {
            let numero = Math.floor(Math.random() * casasLivres.length);
            posicao = casasLivres[numero];
        }
    }

    // coloca o símbolo da máquina no tabuleiro
    tabuleiro[posicao] = "O";
    document.getElementsByClassName("casa")[posicao].innerHTML = "O";
    verificarVencedor();

    // para se a máquina venceu ou deu empate
    if (jogoAcabou == true) {
        return;
    }

    // passa a vez novamente para o jogador
    jogador = "X";
    document.getElementById("jogador").innerHTML = "Vez do jogador: X";
}

// procura uma jogada que pode completar uma linha
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

        // procura uma linha onde falte apenas uma casa
        if (tabuleiro[a] == jogador && tabuleiro[b] == jogador && tabuleiro[c] == "") {
            return c;
        }

        if (tabuleiro[a] == jogador && tabuleiro[c] == jogador && tabuleiro[b] == "") {
            return b;
        }

        if (tabuleiro[b] == jogador && tabuleiro[c] == jogador && tabuleiro[a] == "") {
            return a;
        }
    }

    // retorna -1 quando não encontra uma jogada
    return -1;
}

// verifica se alguém venceu ou se deu empate
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

        // verifica se as três casas têm o mesmo símbolo
        if (tabuleiro[a] != "" && tabuleiro[a] == tabuleiro[b] && tabuleiro[a] == tabuleiro[c]) {
            alert("Jogador " + tabuleiro[a] + " venceu!");
            jogoAcabou = true;
            return;
        }
    }

    // verifica se todas as casas estão ocupadas
    if (!tabuleiro.includes("")) {
        alert("Empate!");
        jogoAcabou = true;
    }
}

// reinicia o jogo
function reiniciar() {
    // limpa o tabuleiro
    tabuleiro = ["", "", "", "", "", "", "", "", ""];

    // começa novamente com o jogador X
    jogador = "X";
    jogoAcabou = false;

    // limpa os símbolos das casas
    let casas = document.getElementsByClassName("casa");

    for (let i = 0; i < casas.length; i++) {
        casas[i].innerHTML = "";
    }

    // mostra novamente a vez do jogador X
    document.getElementById("jogador").innerHTML = "Vez do jogador: X";
}