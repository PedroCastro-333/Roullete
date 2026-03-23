const button = document.getElementById("go-button");

button.addEventListener("click", () => {
    const nameInput = document.getElementById("name");
    const nome = nameInput.value.trim();

    window.location.href = `./pages/roleta.html?name=${encodeURIComponent(nome)}`;
}); 