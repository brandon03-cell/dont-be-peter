let enJuego = [];
let eliminados = [];
let ronda = 1;
let tiempo = 0;
let posicionPeter = -1;
let reloj = null;
let relojFreno = null;
let relojAviso = null;

function ponerMusica() {
  musicaSonando = true;
  musicaDeFondo = false;
  musica.playbackRate = 1;
  musica.volume = 0.5;
  document.getElementById("textoBanner").textContent = "¡A bailar!";
  if (sonidoActivo) {
    musica.play();
  }
  document.getElementById("corro").classList.add("girando");
  document.getElementById("escena").classList.add("sonando");
  document.getElementById("botonParar").textContent = "Parar música";
}

function pararMusica() {
  musicaSonando = false;
  musicaDeFondo = false;
  musica.pause();
  musica.playbackRate = 1;
  document.getElementById("corro").classList.remove("girando");
  document.getElementById("escena").classList.remove("sonando");
}