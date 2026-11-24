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
function crearCabeza(nombre, posicion) {
  let caja = document.createElement("div");
  caja.className = "jugadorDentro";

  let img = document.createElement("img");
  img.src = caraDe(nombre, posicion);
  img.alt = "Cara de " + nombre;
  img.className = "cara";
  caja.appendChild(img);

  let etiqueta = document.createElement("p");
  etiqueta.className = "etiqueta";
  etiqueta.textContent = nombre;
  caja.appendChild(etiqueta);

  return caja;
}

function pintarSala() {
  let sillas = numeroSillas(enJuego);

  document.getElementById("textoRonda").textContent = "Ronda " + ronda;
  document.getElementById("hudRonda").textContent = ronda;
  document.getElementById("hudSillas").textContent = sillas;
  document.getElementById("hudTime").textContent = tiempo;
  document.getElementById("foco").classList.remove("encendido");

  let texto = enJuego.length + " jugadores · " + sillas + " sillas";
  if (enJuego.length == 1) {
    texto = "1 jugador · 0 sillas";
  } else if (sillas == 1) {
    texto = enJuego.length + " jugadores · 1 silla";
  }
  document.getElementById("textoJugadores").textContent = texto;

  if (enJuego.length == 1) {
    document.getElementById("textoMesa").innerHTML = "¡Ha ganado<br>" + enJuego[0] + "!";
  } else if (esUltimaRonda(enJuego)) {
    document.getElementById("textoMesa").innerHTML = "¡Última<br>ronda!";
  } else {
    document.getElementById("textoMesa").innerHTML = sillas + " sillas<br>" + enJuego.length + " personas";
  }

  let chips = document.getElementById("chipsJugadores");
  chips.innerHTML = "";
  for (let i = 0; i < jugadores.length; i++) {
    let chip = document.createElement("span");
    if (eliminados.indexOf(jugadores[i]) == -1) {
      chip.className = "chip";
      chip.innerHTML = '<span class="chipCojin"></span>';
    } else {
      chip.className = "chip chipFuera";
      chip.innerHTML = '<span class="chipCojin"></span>';
    }
    chip.appendChild(document.createTextNode(jugadores[i]));
    chips.appendChild(chip);
  }

  let velocidad = 10 - ronda;
  if (velocidad < 3) {
    velocidad = 3;
  }

  let corro = document.getElementById("corro");
  corro.innerHTML = "";
  corro.style.animationDuration = velocidad + "s";
  for (let j = 0; j < enJuego.length; j++) {
    let angulo = (2 * Math.PI * j) / enJuego.length - Math.PI / 2;
    if (enJuego.length == 1) {
      angulo = -Math.PI / 4;
    }
    let jugador = document.createElement("div");
    jugador.className = "jugador";
    jugador.style.left = 50 + 37 * Math.cos(angulo) + "%";
    jugador.style.top = 52 + 34 * Math.sin(angulo) + "%";
    let dentro = crearCabeza(enJuego[j], jugadores.indexOf(enJuego[j]));
    dentro.style.animationDuration = velocidad + "s";
    jugador.appendChild(dentro);
    corro.appendChild(jugador);
  }

  let totalSillas = numeroSillas(jugadores);
  let cajaSillas = document.getElementById("sillas");
  cajaSillas.innerHTML = "";
  for (let k = 0; k < totalSillas; k++) {
    let anguloSilla = (2 * Math.PI * k) / totalSillas - Math.PI / 2;
    let silla = document.createElement("img");
    silla.alt = "";
    if (k < sillas) {
      silla.src = "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462143/silla.svg";
      silla.className = "silla";
    } else {
      silla.src = "img/sillas/sillaRetirada.png";
      silla.className = "silla sillaRetirada";
    }
    silla.style.left = 50 + 25 * Math.cos(anguloSilla) + "%";
    silla.style.top = 52 + 25 * Math.sin(anguloSilla) + "%";
    cajaSillas.appendChild(silla);
  }
}