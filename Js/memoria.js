let primeiraCarta = null;
let segundaCarta = null;
let pontuacao = 0;
let paresEncontrados = 0;
let segundos = 0;
let tempo = null;
let bloqueado = false;

// começa a contar o tempo
function iniciarTempo() {
    if (tempo == null) {
        tempo = setInterval(function () {
            segundos++;
            let minutos = Math.floor(segundos / 60);
            let segundosRestantes = segundos % 60;
            if (minutos < 10) {
                minutos = "0" + minutos;
            }
            if (segundosRestantes < 10) {
                segundosRestantes = "0" + segundosRestantes;
            }
            document.getElementById("tempo").innerHTML = minutos + ":" + segundosRestantes;
        }, 1000);
    }
}

// vira a carta quando o jogador clica
function virarCarta(carta) {
    let musica = document.getElementById("musica");

    // a música começa no primeiro clique
    if (musica.paused) {
        musica.volume = 0.3;
        musica.play();
    }

    // impede novos cliques enquanto as cartas estão sendo verificadas
    if (bloqueado == true) {
        return;
    }

    // impede clicar em uma carta que já foi acertada
    if (carta.classList.contains("acertada")) {
        return;
    }

    // impede clicar duas vezes na mesma carta
    if (carta == primeiraCarta) {
        return;
    }

    // começa o tempo no primeiro clique
    iniciarTempo();

    // vira a carta
    carta.classList.add("virada");

    // guarda a primeira carta escolhida
    if (primeiraCarta == null) {
        primeiraCarta = carta;
        return;
    }

    // guarda a segunda carta escolhida
    segundaCarta = carta;
    bloqueado = true;

    // verifica se as duas cartas são iguais
    if (primeiraCarta.dataset.par == segundaCarta.dataset.par) {

        // adiciona 10 pontos
        pontuacao += 10;
        paresEncontrados++;

        // atualiza a pontuação
        document.getElementById("pontuacao").innerHTML = pontuacao;

        // deixa as cartas certas viradas
        primeiraCarta.classList.add("acertada");
        segundaCarta.classList.add("acertada");

        // limpa as cartas escolhidas
        primeiraCarta = null;
        segundaCarta = null;
        bloqueado = false;

        // verifica se todos os pares foram encontrados
        if (paresEncontrados == 6) {
            finalizarJogo();
        }

    } else {

        // se estiverem erradas, espera 1 segundo e vira novamente
        setTimeout(function () {
            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");
            primeiraCarta = null;
            segundaCarta = null;
            bloqueado = false;
        }, 1000);
    }
}

// finaliza o jogo quando todos os pares são encontrados
function finalizarJogo() {

    // para o contador
    clearInterval(tempo);

    // mostra a pontuação final
    document.getElementById("pontuacaoFinal").innerHTML = pontuacao;

    // mostra o tempo final
    document.getElementById("tempoFinal").innerHTML = document.getElementById("tempo").innerHTML;

    // mostra a tela de resultado
    setTimeout(function () {
        document.getElementById("resultado").classList.add("mostrar");
    }, 500);
}

// embaralha as cartas
function embaralharCartas() {
    let cartas = document.querySelectorAll(".carta");
    let areaCartas = document.querySelector(".cartas");
    let cartasArray = Array.from(cartas);

    // troca as posições das cartas aleatoriamente
    for (let i = cartasArray.length - 1; i > 0; i--) {
        let numero = Math.floor(Math.random() * (i + 1));
        let temp = cartasArray[i];
        cartasArray[i] = cartasArray[numero];
        cartasArray[numero] = temp;
    }

    // coloca as cartas novamente na área do jogo
    cartasArray.forEach(function (carta) {
        areaCartas.appendChild(carta);
    });
}

// reinicia o jogo
function jogarNovamente() {

    // para o contador atual
    clearInterval(tempo);

    // volta as variáveis para o início
    primeiraCarta = null;
    segundaCarta = null;
    pontuacao = 0;
    paresEncontrados = 0;
    segundos = 0;
    tempo = null;
    bloqueado = false;

    // zera a pontuação e o tempo
    document.getElementById("pontuacao").innerHTML = "0";
    document.getElementById("tempo").innerHTML = "00:00";

    // esconde a tela final
    document.getElementById("resultado").classList.remove("mostrar");

    // vira todas as cartas novamente
    let cartas = document.querySelectorAll(".carta");

    cartas.forEach(function (carta) {
        carta.classList.remove("virada");
        carta.classList.remove("acertada");
    });

    // embaralha as cartas novamente
    embaralharCartas();
}

// adiciona o clique em todas as cartas
let cartas = document.querySelectorAll(".carta");

cartas.forEach(function (carta) {
    carta.addEventListener("click", function () {
        virarCarta(carta);
    });
});

// adiciona o clique no botão "jogar novamente"
document.getElementById("jogarNovamente").addEventListener("click", function () {
    jogarNovamente();
});

// embaralha as cartas quando o jogo começa
embaralharCartas();