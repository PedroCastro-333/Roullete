let currentRotation = 0;

function getNomeDaURL() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("name") || "").toLowerCase().trim();
}

function nomeEhVencedor(nome) {
    const vencedores = [ 
        "caroline",
        "caroline helena",
        "caroline helena correa",
        "caroline helena corrêa",
        "caroline helena correa gonzaga",
        "caroline helena corrêa gonzaga",
        "vygrid",
        "vygrida"
    ];

    return vencedores.includes(nome);
}

const ANGULO_GANHOU = 342;
const ANGULOS_PERDEU = [306, 270, 234, 198, 162, 126, 90, 54, 18];
const TEMPO_ANIMACAO_ROLETA = 1200;

function calcularRotacaoAteAlvo(alvo) {
    const rotacaoAtualNormalizada = ((currentRotation % 360) + 360) % 360;
    const diferenca = (alvo - rotacaoAtualNormalizada + 360) % 360;
    const voltasExtras = 3600;

    return voltasExtras + diferenca;
}

function limparImagensVitoria() {
    const effects = document.getElementById("win-effects");

    if (effects) {
        effects.innerHTML = "";
    }
}

function criarImagemVitoria(src, classe, largura = 170) {
    const effects = document.getElementById("win-effects");

    if (!effects) return;

    const img = document.createElement("img");
    img.src = src;
    img.className = `win-img ${classe}`;
    img.style.width = `${largura}px`;

    effects.appendChild(img);
}

function mostrarAnimacaoDeVitoria() {
    limparImagensVitoria();

    criarImagemVitoria("../assets/vessel.gif", "win-left", 160);
    criarImagemVitoria("../assets/snoopy-dancing1.gif", "win-right", 160);
    criarImagemVitoria("../assets/boboca1.jpg", "win-top-left", 110);
    criarImagemVitoria("../assets/boboca2.jpg", "win-top-right", 110);
}

function mostrarImagemZoomCentral(src, largura = 260) {
    const img = document.createElement("img");

    img.src = src;
    img.className = "win-img win-zoom-center";
    img.style.width = `${largura}px`;

    document.body.appendChild(img);

    // setTimeout(() => {
    //     img.remove();
    // }, 2500);
}

function criarBotaoTicket(nome) {
    const ticketContainer = document.getElementById("ticket-container");
    if (!ticketContainer) return;

    ticketContainer.innerHTML = "";

    const botaoTicket = document.createElement("button");
    botaoTicket.textContent = "Resgatar Ticket 🎟️";
    botaoTicket.id = "ticket-button";

    botaoTicket.addEventListener("click", () => {
        window.location.href = `ticket.html?name=${encodeURIComponent(nome)}`;
    });

    ticketContainer.appendChild(botaoTicket);
}

function spin() {
    const wheel = document.querySelector(".wheel");
    const resultado = document.getElementById("resultado");
    const botao = document.getElementById("spin-button");
    const ticketContainer = document.getElementById("ticket-container");

    if (!wheel || !resultado || !botao || !ticketContainer) return;

    const nome = getNomeDaURL();
    const ganhou = nomeEhVencedor(nome);

    let alvoFinal;

    if (ganhou) {
        alvoFinal = ANGULO_GANHOU;
    } else {
        const indice = Math.floor(Math.random() * ANGULOS_PERDEU.length);
        alvoFinal = ANGULOS_PERDEU[indice];
    }

    botao.disabled = true;
    resultado.textContent = "";
    ticketContainer.innerHTML = "";
    limparImagensVitoria();

    const rotacaoNecessaria = calcularRotacaoAteAlvo(alvoFinal);
    currentRotation += rotacaoNecessaria;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        resultado.textContent = ganhou ? "🎉 Você ganhou!" : "❌ Você não ganhou!";

        if (ganhou) {
            mostrarImagemZoomCentral("../assets/dogf.webp");

            setTimeout(() => {
                mostrarAnimacaoDeVitoria();
                criarBotaoTicket(nome);
            }, 400);
        }

        botao.disabled = false;
    }, TEMPO_ANIMACAO_ROLETA);
}

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("spin-button");

    if (botao) {
        botao.addEventListener("click", spin);
    }
});