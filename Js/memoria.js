let primeiraCarta = "";
let segundaCarta = "";

let pontuacao = 0;
let segundos = 0;
let tempo = null;

let bloqueado = false;


// COMEÇA O TEMPO

function iniciarTempo() {

    if (tempo == null) {

        tempo = setInterval(function() {

            segundos++;

            let minutos = Math.floor(segundos / 60);
            let segundosRestantes = segundos % 60;

            if (minutos < 10) {
                minutos = "0" + minutos;
            }

            if (segundosRestantes < 10) {
                segundosRestantes = "0" + segundosRestantes;
            }

            document.getElementById("tempo").innerHTML =
                minutos + ":" + segundosRestantes;

        }, 1000);
    }
}


// VIRAR CARTA

function virar(carta) {

    // Não deixa clicar enquanto duas cartas estão sendo verificadas
    if (bloqueado == true) {
        return;
    }

    // Não deixa clicar em carta já acertada
    if (carta.classList.contains("acertada")) {
        return;
    }

    // Não deixa clicar na mesma carta
    if (carta == primeiraCarta) {
        return;
    }

    iniciarTempo();

    carta.classList.add("virada");


    if (primeiraCarta == "") {

        primeiraCarta = carta;

    } else {

        segundaCarta = carta;

        // Bloqueia uma terceira carta
        bloqueado = true;


        // ACERTOU

        if (primeiraCarta.innerHTML == segundaCarta.innerHTML) {

            pontuacao += 10;

            document.getElementById("pontuacao").innerHTML = pontuacao;

            primeiraCarta.classList.add("acertada");
            segundaCarta.classList.add("acertada");

            primeiraCarta = "";
            segundaCarta = "";

            // Libera para escolher outras cartas
            bloqueado = false;


            // FINALIZOU O JOGO

            if (pontuacao == 40) {

                clearInterval(tempo);

                setTimeout(function() {

                    alert(
                        "Parabéns!\n\n" +
                        "Você encontrou todos os pares!\n" +
                        "Pontuação: " + pontuacao + "\n" +
                        "Tempo: " +
                        document.getElementById("tempo").innerHTML
                    );

                }, 500);
            }


        } else {

            // ERROU

            setTimeout(function() {

                primeiraCarta.classList.remove("virada");
                segundaCarta.classList.remove("virada");

                primeiraCarta = "";
                segundaCarta = "";

                // Libera novamente
                bloqueado = false;

            }, 1000);
        }
    }
}