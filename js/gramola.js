
let canciones = [
  { titulo: "Stage Select", autor: "Juhani Junkala", archivo: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795529256/stageSelect_1_ifkskc.ogg", color: "#ffd23f" },
  { titulo: "Stage 1", autor: "Juhani Junkala", archivo: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528862/stage1_jvhgfp.ogg", color: "#e03c3c" },
  { titulo: "Stage 2", autor: "Juhani Junkala", archivo: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528867/stage2_htmrft.ogg", color: "#4caf50" },
  { titulo: "Boss Fight", autor: "Juhani Junkala", archivo: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528869/bossFight_dfam1f.ogg", color: "#3c6fe0" },
  { titulo: "Title Screen", autor: "Juhani Junkala", archivo: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795529254/titleScreen_1_bpwbwc.ogg", color: "#e88bb0" },
  { titulo: "Level 1", autor: "Juhani Junkala", archivo: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528860/level1_uvm1aq.ogg", color: "#e07b28" },
  { titulo: "Level 2", autor: "Juhani Junkala", archivo: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528861/level2_lwte8c.ogg", color: "#ffd23f" },
  { titulo: "Level 3", autor: "Juhani Junkala", archivo: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528863/level3_n17tq8.ogg", color: "#e03c3c" },
  { titulo: "Ending", autor: "Juhani Junkala", archivo: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528865/ending_jraxde.ogg", color: "#4caf50" }
];

let cancionesPorPagina = 4;
let cancionActual = 0;
let paginaDiscos = 0;
let sonandoGramola = false;
let vengoDeLaSala = false;

let letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function codigoCancion(posicion, porPagina) {
  let letra = letras[Math.floor(posicion / porPagina)];
  let numero = (posicion % porPagina) + 1;
  return letra + numero;
}

function totalPaginas(total, porPagina) {
  if (total == 0) {
    return 1;
  }
  return Math.ceil(total / porPagina);
}

function paginaDe(posicion, porPagina) {
  return Math.floor(posicion / porPagina);
}

function siguientePosicion(posicion, total) {
  return (posicion + 1) % total;
}

function anteriorPosicion(posicion, total) {
  return (posicion - 1 + total) % total;
}

function formatearTiempo(segundos) {
  if (!isFinite(segundos)) {
    return "0:00";
  }
  let minutos = Math.floor(segundos / 60);
  let resto = Math.floor(segundos % 60);
  if (resto < 10) {
    resto = "0" + resto;
  }
  return minutos + ":" + resto;
}

function pintarCancion() {
  let cancion = canciones[cancionActual];
  document.getElementById("tituloCancion").textContent = cancion.titulo;
  document.getElementById("autorCancion").textContent = cancion.autor;
  document.getElementById("etiquetaDisco").textContent = codigoCancion(cancionActual, cancionesPorPagina);
  document.getElementById("etiquetaDisco").style.backgroundColor = cancion.color;

  let info = document.getElementById("ahoraSuena");
  info.classList.remove("aparecer");
  setTimeout(function () {
    info.classList.add("aparecer");
  }, 10);
}

function pintarDiscos() {
  let lista = document.getElementById("listaCanciones");
  lista.innerHTML = "";

  let desde = paginaDiscos * cancionesPorPagina;
  for (let i = desde; i < desde + cancionesPorPagina; i++) {
    let hueco = document.createElement("li");

    if (i < canciones.length) {
      let ficha = document.createElement("button");
      ficha.className = "fichaDisco";
      if (i == cancionActual) {
        ficha.className = "fichaDisco fichaDiscoElegida";
      }

      let codigo = document.createElement("span");
      codigo.className = "fichaDiscoCodigo";
      codigo.textContent = codigoCancion(i, cancionesPorPagina);
      ficha.appendChild(codigo);

      let titulo = document.createElement("span");
      titulo.textContent = canciones[i].titulo;
      ficha.appendChild(titulo);

      ficha.dataset.cancion = i;
      ficha.addEventListener("click", function () {
        sonar("clic");
        let elegida = Number(this.dataset.cancion);
        if (elegida == cancionActual) {
          pausarOSeguir();
        } else {
          ponerCancion(elegida);
        }
      });
      hueco.appendChild(ficha);
    } else {
      hueco.className = "fichaDisco fichaDiscoVacia";
      hueco.textContent = "Libre";
    }

    lista.appendChild(hueco);
  }

  let paginas = totalPaginas(canciones.length, cancionesPorPagina);
  document.getElementById("textoPagina").textContent =
    "Página " + letras[paginaDiscos] + " · " + (paginaDiscos + 1) + " de " + paginas;
}

function cargarCancion(posicion) {
  cancionActual = posicion;
  paginaDiscos = paginaDe(cancionActual, cancionesPorPagina);
  musica.src = canciones[cancionActual].archivo;
  localStorage.setItem("gramolaCancion", cancionActual);
  pintarCancion();
  pintarDiscos();
  pintarTiempo();
}

function tocarGramola() {
  sonandoGramola = true;
  musica.volume = 0.5;
  if (sonidoActivo) {
    musica.play();
  }
  document.getElementById("escenaGramola").classList.add("sonando");
  document.getElementById("estadoCancion").textContent = "Sonando";
}

function pausarGramola() {
  sonandoGramola = false;
  musica.pause();
  document.getElementById("escenaGramola").classList.remove("sonando");
  document.getElementById("estadoCancion").textContent = "En pausa";
}

function ponerCancion(posicion) {
  cargarCancion(posicion);
  tocarGramola();
}

function pausarOSeguir() {
  if (sonandoGramola) {
    pausarGramola();
  } else {
    tocarGramola();
  }
}

function siguienteCancion() {
  ponerCancion(siguientePosicion(cancionActual, canciones.length));
}

function anteriorCancion() {
  ponerCancion(anteriorPosicion(cancionActual, canciones.length));
}

function cambiarPaginaDiscos(salto) {
  let paginas = totalPaginas(canciones.length, cancionesPorPagina);
  paginaDiscos = (paginaDiscos + salto + paginas) % paginas;
  pintarDiscos();
}

function pintarTiempo() {
  let porcentaje = 0;
  if (musica.duration > 0) {
    porcentaje = (musica.currentTime / musica.duration) * 100;
  }
  document.getElementById("rellenoProgreso").style.width = porcentaje + "%";
  document.getElementById("tiempoCancion").textContent =
    formatearTiempo(musica.currentTime) + " / " + formatearTiempo(musica.duration);
}

function cargarCancionGuardada() {
  let guardada = localStorage.getItem("gramolaCancion");
  if (guardada != null && Number(guardada) < canciones.length) {
    cancionActual = Number(guardada);
  }
  cargarCancion(cancionActual);
}

function irAGramola() {
  vengoDeLaSala = document.getElementById("pantallaSala").classList.contains("activa");
  pararMusica();
  musica.loop = false;
  paginaDiscos = paginaDe(cancionActual, cancionesPorPagina);
  pintarDiscos();

  if (vengoDeLaSala) {
    document.getElementById("botonVolverPartida").classList.remove("oculto");
  } else {
    document.getElementById("botonVolverPartida").classList.add("oculto");
  }
  mostrarPantalla("pantallaGramola");
}

function salirDeGramola() {
  pausarGramola();
  musica.loop = true;
}

function prepararGramola() {
  document.getElementById("botonVolverGramola").addEventListener("click", function () {
    sonar("clic");
    salirDeGramola();
    irAlMenu();
  });

  document.getElementById("botonVolverPartida").addEventListener("click", function () {
    sonar("clic");
    salirDeGramola();
    mostrarPantalla("pantallaSala");
    ponerMusica();
  });

  document.getElementById("disco").addEventListener("click", function () {
    sonar("clic");
    pausarOSeguir();
  });

  document.getElementById("barraProgreso").addEventListener("click", function (evento) {
    if (musica.duration > 0) {
      musica.currentTime = (evento.offsetX / this.offsetWidth) * musica.duration;
    }
  });

  document.getElementById("paginaAnterior").addEventListener("click", function () {
    sonar("clic");
    cambiarPaginaDiscos(-1);
  });

  document.getElementById("paginaSiguiente").addEventListener("click", function () {
    sonar("clic");
    cambiarPaginaDiscos(1);
  });

  musica.addEventListener("timeupdate", pintarTiempo);
  musica.addEventListener("loadedmetadata", pintarTiempo);

  musica.addEventListener("ended", function () {
    siguienteCancion();
  });

  musica.addEventListener("error", function () {
    document.getElementById("estadoCancion").textContent = "No se encuentra";
  });

  document.addEventListener("keydown", function (evento) {
    let enGramola = document.getElementById("pantallaGramola").classList.contains("activa");
    if (!enGramola) {
      return;
    }
    if (evento.key == " " && evento.target.tagName != "BUTTON") {
      evento.preventDefault();
      pausarOSeguir();
    } else if (evento.key == "ArrowRight") {
      siguienteCancion();
    } else if (evento.key == "ArrowLeft") {
      anteriorCancion();
    }
  });
}

if (typeof module != "undefined") {
  module.exports = {
    codigoCancion: codigoCancion,
    totalPaginas: totalPaginas,
    paginaDe: paginaDe,
    siguientePosicion: siguientePosicion,
    anteriorPosicion: anteriorPosicion,
    formatearTiempo: formatearTiempo
  };
} else {
  prepararGramola();
}