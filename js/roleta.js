let currentRotation = 0;

const spinButton = document.getElementById("spin-button");
const snoopyHelper = document.getElementById("snoopy-helper");
const speechBubble = document.getElementById("speech-bubble");

let escapeCount = 0;
let snoopyHelping = false;
let isSpinning = false;

const buttonPositions = [
  { left: 25, top: 18 },
  { left: 210, top: 18 },
  { left: 35, top: 110 },
  { left: 215, top: 110 }
];

const funnyTexts = [
  "opa 👀",
  "quase...",
  "ih, escapou 😈",
  "calma..."
];

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

function shakeButton() {
  spinButton.classList.remove("shake");
  void spinButton.offsetWidth;
  spinButton.classList.add("shake");
}

function moveButton() {
  const pos = buttonPositions[Math.floor(Math.random() * buttonPositions.length)];
  spinButton.style.left = `${pos.left}px`;
  spinButton.style.top = `${pos.top}px`;
}

function resetRoundUI() {
  const resultado = document.getElementById("resultado");
  const ticketContainer = document.getElementById("ticket-container");

  resultado.textContent = "";
  ticketContainer.innerHTML = "";
}

function activateSnoopyAndSpin() {
  snoopyHelping = true;

  snoopyHelper.classList.remove("hidden");

  setTimeout(() => {
    snoopyHelper.classList.add("show");
  }, 20);

  speechBubble.textContent = "eu vou ajudar você";

  spinButton.style.left = "220px";
  spinButton.style.top = "103px";
  spinButton.textContent = "deixa comigo 😎";
  spinButton.classList.add("helped");
  spinButton.disabled = true;

  setTimeout(() => {
    speechBubble.textContent = "girando...";
  }, 900);

  setTimeout(() => {
    spin();
  }, 1500);
}

function spin() {
  if (isSpinning) return;

  isSpinning = true;

  const wheel = document.querySelector(".wheel");
  const resultado = document.getElementById("resultado");
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

  resetRoundUI();

  const rotacaoNecessaria = calcularRotacaoAteAlvo(alvoFinal);
  currentRotation += rotacaoNecessaria;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    resultado.textContent = ganhou ? "✅ Você ganhou!" : "❌ Você não ganhou!";

    if (ganhou) {
      const botaoTicket = document.createElement("button");
      botaoTicket.textContent = "Resgatar Ticket 🎟️";
      botaoTicket.id = "ticket-button";

      botaoTicket.addEventListener("click", () => {
        window.location.href = `ticket.html?name=${encodeURIComponent(nome)}`;
      });

      ticketContainer.appendChild(botaoTicket);
    }

    isSpinning = false;
    escapeCount = 0;
    snoopyHelping = false;

    spinButton.disabled = false;
    spinButton.textContent = "Girar novamente";
    spinButton.classList.remove("helped");

    snoopyHelper.classList.remove("show");
    setTimeout(() => {
      snoopyHelper.classList.add("hidden");
      speechBubble.textContent = "eu vou ajudar você";
    }, 350);

    spinButton.style.left = "110px";
    spinButton.style.top = "65px";
  }, 1200);
}

spinButton.addEventListener("click", () => {
  if (isSpinning) return;

  if (!snoopyHelping) {
    escapeCount++;
    moveButton();
    shakeButton();

    if (escapeCount <= funnyTexts.length) {
      spinButton.textContent = funnyTexts[escapeCount - 1];
    }

    if (escapeCount >= 4) {
      activateSnoopyAndSpin();
    }

    return;
  }

  spin();
});
