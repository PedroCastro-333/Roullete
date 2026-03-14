function getNomeDaURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("name") || "Ganhador";
}

function formatarNome(nome) {
    return nome
        .trim()
        .split(" ")
        .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");
}

const PREMIOS = {
    "Massagem": "MSG",
    // "Jantar": "JNT",
    // "Cinema": "CIN"
    "Funilaria Lanches": "FNL",
    "Viagem": "VGM",
    "Sushi": "SUH",
    "Cafeteria": "CAF",
    "Chocolate": "CHL",
    // "Praia noturna": "PRN",
    // "Rio de Janeiro": "RJ",
    "Piquenique": "PIQ",
    "Doce a sua escolha": "DOCE",
    "Tabua de frios": "TAB",
    "Garrafa D'água": "AGU",
    "Beijo no rosto": "BJO",
    "Dar mordida onde quiser": "VMP",

};

function escolherPremio() {

    const chaves = Object.keys(PREMIOS)
    const indice = Math.floor(Math.random() * chaves.length)

    return chaves[indice]

}


function gerarNumeroTicket() {

    return Math.floor(100 + Math.random() * 900)

}


function gerarTicket() {

    const premio = escolherPremio()

    const prefixo = PREMIOS[premio]

    const numero = gerarNumeroTicket()

    return {
        premio: premio,
        codigo: `${prefixo}-${numero}`
    }

}


const nome = formatarNome(getNomeDaURL())

const ticket = gerarTicket()

document.getElementById("winner-name").textContent = nome
document.getElementById("ticket-code").textContent = ticket.codigo


document.getElementById("ticket-prize").textContent = ticket.premio


document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "../index.html"
})