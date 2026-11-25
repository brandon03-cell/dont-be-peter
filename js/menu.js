function irAlMenu() {
    mostrarPantalla("pantallaMenu");
}

document.getElementById("botonEmpezar").addEventListener("click", function () {
    sonar("clic");
    irAlReparto();
});

document.getElementById("botonMusica").addEventListener("click", function () {
    sonar("clic");
    irAGramola();
});

document.getElementById("botonTutorial").addEventListener("click", function () {
    sonar("clic");
    mostrarPantalla("pantallaTutorial");
});

document.getElementById("botonCreditos").addEventListener("click", function () {
    sonar("clic");
    mostrarPantalla("pantallaCreditos");
});

document.getElementById("botonSonidoMenu").addEventListener("click", cambiarSonido);