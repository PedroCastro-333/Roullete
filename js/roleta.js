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
        "caroline helena correa gonzaga",
        "vygrid",
        "vygrida"
    ];

    return vencedores.includes(nome);
}

const ANGULO_GANHOU = 342;
const ANGULOS_PERDEU = [306, 270, 234, 198, 162, 126, 90, 54, 18];

function calcularRotacaoAteAlvo(alvo) {
    const rotacaoAtualNormalizada = ((currentRotation % 360) + 360) % 360;
    const diferenca = (alvo - rotacaoAtualNormalizada + 360) % 360;
    const voltasExtras = 3600;

    return voltasExtras + diferenca;
}

function spin() {
    const wheel = document.querySelector(".wheel");
    const resultado = document.getElementById("resultado");
    const botao = document.getElementById("spin-button");
    const ticketContainer = document.getElementById("ticket-container");

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

    const rotacaoNecessaria = calcularRotacaoAteAlvo(alvoFinal);
    currentRotation += rotacaoNecessaria;

    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        resultado.textContent = ganhou ? "🎉 Você ganhou!" : "❌ Você não ganhou!";

        if (ganhou) {
            const botaoTicket = document.createElement("button");
            botaoTicket.textContent = "Resgatar Ticket 🎟️";
            botaoTicket.id = "ticket-button";

            botaoTicket.addEventListener("click", () => {
                window.location.href = `ticket.html?name=${encodeURIComponent(nome)}`;
            });

            ticketContainer.appendChild(botaoTicket);
        }

        botao.disabled = false;
    }, 1200);
}

document.getElementById("spin-button").addEventListener("click", spin);