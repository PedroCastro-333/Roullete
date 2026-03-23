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
    // "Massagem": "MSG",
    // "Jantar": "JNT",
    // "Cinema": "CIN"
    // "Funilaria Lanches": "FNL",
    // "Viagem": "VGM",
    // "Sushi": "SUH",
    // "Cafeteria": "CAF",
    // "Chocolate": "CHL",
    // "Praia noturna": "PRN",
    //  "Rio de Janeiro": "RJ",
    // "Piquenique": "PIQ",
    // "Doce a sua escolha": "DOCE",
    // "Tabua de frios": "TAB",
    // "Garrafa D'água": "AGU",
    // "Beijo no rosto": "BJO",
    // "Dar mordida onde quiser": "VMP",
    "Miniatura de carro": "MIN"

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

let clickCount = 0;

const overlay = document.querySelector(".spoiler-overlay");
const img = document.querySelector(".spoiler-container img");

overlay.addEventListener("click", () => {

    overlay.style.display = 'none';

    // clickCount++;

    // switch (clickCount) {
    //     case 1:
    //         alert("Tem certeza? Eu deixei essa opção porque fiquei ansioso.");
    //         break;

    //     case 2:
    //         alert("Eu sei que você consegue segurar essa vontade de saber.");
    //         break;

    //     case 3:
    //         alert("Se você clicar mais uma vez vai estragar a surpresa.");
    //         break;

    //     case 4:
    //         img.src = "../assets/giggle-snoopy.gif";
    //         alert("Quer saber... Desisti de revelar.");

    //     default:
    //         overlay.style.display = "none";
    //         break;
    // }
});
const spoiler = document.querySelector(".spoiler-container");
if (ticket.premio !== "Miniatura de carro") {
    spoiler.style.display = "none";
}

document.getElementById("winner-name").textContent = nome
document.getElementById("ticket-code").textContent = ticket.codigo


document.getElementById("ticket-prize").textContent = ticket.premio


document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "../index.html"
})