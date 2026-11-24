
let chinchetas = [
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169966/chincheta_roja_hndirn.svg",
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169967/chincheta_azul_gyckgk.svg",
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169967/chincheta_verde_k2yvjs.svg",
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169968/chincheta_rosa_so5aoj.svg",
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169966/chincheta_amarilla_tawd7l.svg"
];

function pintarReparto() {
    let lista = document.getElementById("listaFichas");
    lista.innerHTML = "";

for (let i = 0; i < jugadores.length; i++) {
    let ficha = document.createElement("li");
    ficha.className = "ficha";

    let chincheta = document.createElement("img");
    chincheta.className = "fichaChincheta";
    chincheta.src = chinchetas[i % chinchetas.length];
    chincheta.alt = "";
    ficha.appendChild(chincheta);

    let numero = document.createElement("span");
    numero.className = "fichaNumero";
    if (i < 9) {
        numero.textContent = "0" + (i + 1);
    } else {
        numero.textContent = i + 1;
    }
    ficha.appendChild(numero);

    let color = document.createElement("span");
    color.className = "fichaColor";
    color.style.backgroundColor = colorDe(i);
    ficha.appendChild(color);

    let cara = document.createElement("img");
    cara.className = "fichaCara";
    cara.src = caraDe(jugadores[i], i);
    cara.alt = "Cara de " + jugadores[i];
    ficha.appendChild(cara);

    let nombre = document.createElement("p");
    nombre.className = "etiqueta";
    nombre.textContent = jugadores[i];
    ficha.appendChild(nombre);

    let quitar = document.createElement("button");
    quitar.className = "quitar";
    quitar.innerHTML = '<img src="https://res.cloudinary.com/daul6tzck/image/upload/v1795169968/papelera_l93csq.svg" alt=""><span class="quitarTexto">Quitar</span>';
    quitar.setAttribute("aria-label", "Quitar a " + jugadores[i]);
    quitar.dataset.posicion = i;
    quitar.addEventListener("click", function () {
        jugadores = quitarNombre(jugadores, Number(this.dataset.posicion));
        guardar();
        sonar("borrar");
        pintarReparto();
    });
    ficha.appendChild(quitar);

    lista.appendChild(ficha);
}

if (jugadores.length == 0) {
    document.getElementById("corchoVacio").classList.remove("oculto");
} else {
    document.getElementById("corchoVacio").classList.add("oculto");
}

let sillas = numeroSillas(jugadores);
document.getElementById("contadorNumero").textContent = jugadores.length;
if (jugadores.length == 1) {
    document.getElementById("contadorTexto").textContent = "jugador";
    document.getElementById("textoCandidatos").textContent = "1 candidato";
} else {
    document.getElementById("contadorTexto").textContent = "jugadores";
    document.getElementById("textoCandidatos").textContent = jugadores.length + " candidatos";
}
if (sillas == 1) {
    document.getElementById("contadorSillas").textContent = "= 1 silla";
} else {
    document.getElementById("contadorSillas").textContent = "= " + sillas + " sillas";
}

let fila = document.getElementById("sillasFila");
fila.innerHTML = "";
for (let j = 0; j < sillas; j++) {
    let silla = document.createElement("img");
    silla.src = "https://res.cloudinary.com/daul6tzck/image/upload/v1795169970/silla_icono_dyud6w.svg";
    silla.alt = "";
    fila.appendChild(silla);
}

    document.getElementById("botonJugar").disabled = !sePuedeJugar(jugadores);
}

function mostrarError(texto) {
    let campo = document.getElementById("campoNombre");
        document.getElementById("mensajeError").textContent = texto;
    if (texto == "") {
        campo.classList.remove("campoError");
    } else {
        campo.classList.add("campoError");
    }
}

function irAlReparto() {
    pintarReparto();
    mostrarError("");
    mostrarPantalla("pantallaReparto");
}

document.getElementById("formularioNombre").addEventListener("submit", function (evento) {
    evento.preventDefault();
    let campo = document.getElementById("campoNombre");
    let error = validarNombre(jugadores, campo.value);
    if (error != "") {
        mostrarError(error);
        sonar("borrar");
        return;
    }
    jugadores = anadirNombre(jugadores, campo.value);
    guardar();
    sonar("anadir");
    mostrarError("");
    campo.value = "";
    campo.focus();
    pintarReparto();
});

function cargarEjemplo() {
    jugadores = ejemplo.slice();
    guardar();
    sonar("anadir");
    mostrarError("");
    pintarReparto();
}

document.getElementById("botonEjemplo").addEventListener("click", cargarEjemplo);
document.getElementById("botonEjemploMovil").addEventListener("click", cargarEjemplo);

document.getElementById("botonJugar").addEventListener("click", function () {
    if (!sePuedeJugar(jugadores)) {
        mostrarError("Hacen falta al menos 2 jugadores.");
        return;
    }
    empezarPartida();
});

document.getElementById("botonVolverReparto").addEventListener("click", function () {
    sonar("clic");
    irAlMenu();
});