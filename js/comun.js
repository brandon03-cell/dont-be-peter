let jugadores = [];
let sonidoActivo = true;
let musicaSonando = false;
let musicaDeFondo = false;

let musica = new Audio();
musica.loop = true;
musica.volume = 0.5;
musica.preservesPitch = false;

let sonidos = {
  clic: new Audio("https://res.cloudinary.com/do4k9fww6/video/upload/v1795462140/clic.ogg")
};

function sonar(nombre) {
  if (!sonidoActivo || !sonidos[nombre]) {
    return;
  }
  let sonido = sonidos[nombre];
  sonido.currentTime = 0;
  sonido.play();
}

function cambiarSonido() {
  sonidoActivo = !sonidoActivo;
  if (sonidoActivo) {
    if (musicaSonando || musicaDeFondo) {
      musica.play();
    }
  } else {
    musica.pause();
  }
  pintarSonido();
}

function pintarSonido() {
  let botonMenu = document.getElementById("botonSonidoMenu");
  let icono = document.getElementById("iconoSonidoMenu");

  if (sonidoActivo) {
    document.getElementById("botonSonido").textContent = "Sonido";
    icono.src = "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462138/altavoz.svg";
    botonMenu.setAttribute("aria-label", "Quitar la música");
  } else {
    document.getElementById("botonSonido").textContent = "Sin sonido";
    icono.src = "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462138/altavozMudo.svg";
    botonMenu.setAttribute("aria-label", "Poner la música");
  }
}

function mostrarPantalla(id) {
  let pantallas = document.querySelectorAll(".pantalla");
  for (let i = 0; i < pantallas.length; i++) {
    pantallas[i].classList.remove("activa");
  }
  document.getElementById(id).classList.add("activa");

  if (id == "pantallaReparto" || id == "pantallaSala") {
    document.getElementById("barra").classList.remove("oculto");
    document.body.classList.add("conBarra");
  } else {
    document.getElementById("barra").classList.add("oculto");
    document.body.classList.remove("conBarra");
  }

  window.scrollTo(0, 0);
}

function guardar() {
  localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

function cargar() {
  let guardado = localStorage.getItem("jugadores");
  if (guardado) {
    jugadores = JSON.parse(guardado);
  }
}

document.getElementById("botonSonido").addEventListener("click", cambiarSonido);

document.getElementById("botonReiniciar").addEventListener("click", function () {
  let seguro = confirm("¿Reiniciar la empresa? Se borra la hoja de reparto.");
  if (!seguro) {
    return;
  }
  localStorage.removeItem("jugadores");
  jugadores = [];
  mostrarPantalla("pantallaWelcome");
});

document.addEventListener("DOMContentLoaded", function () {
  cargar();
  mostrarPantalla("pantallaWelcome");
});