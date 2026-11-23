let maximoJugadores = 12;
let minimoJugadores = 2;

let caras = {
    alba: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462138/alba.png",
    brandon: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462140/brandon.png",
    daniel: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462140/daniel.png",
    diego: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/diego.png",
    isabel: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/isabel.png",
    "jose luis": "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/joseLuis.png",
    juanjo: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/juanjo.png",
    julian: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/julian.png",
    manuel: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/manuel.png",
    nerea: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/nerea.png",
    paloma: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462143/paloma.png",
    rafa: "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/rafa.png"
};

let carasGenericas = [
    "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/gorraAzul.png",
    "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462143/peloNaranja.png",
    "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/pinchosRojo.png",
    "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462140/coletas.png"
];

let colores = ["#3b6fd4", "#d43b3b", "#3ba84a", "#e88ac0", "#f2c230", "#8a5cd4"];

let ejemplo = ["Brandon", "Alba", "Diego", "Manuel", "Julián", "Paloma"];

function quitarTildes(texto) {
    texto = texto.toLowerCase();
    texto = texto.replace(/á/g, "a");
    texto = texto.replace(/é/g, "e");
    texto = texto.replace(/í/g, "i");
    texto = texto.replace(/ó/g, "o");
    texto = texto.replace(/ú/g, "u");
    return texto;
}

function limpiarNombre(nombre) {
    return nombre.trim();
}

function estaRepetido(lista, nombre) {
    for (let i = 0; i < lista.length; i++) {
        if (quitarTildes(lista[i]) == quitarTildes(nombre)) {
            return true;
        }
    }
    return false;
}

function validarNombre(lista, nombre) {
    nombre = limpiarNombre(nombre);
    if (nombre == "") {
        return "Escribe un nombre.";
    }
    if (nombre.length > 15) {
        return "El nombre es muy largo (máximo 15 letras).";
    }
    if (estaRepetido(lista, nombre)) {
        return "Ese nombre ya está en la hoja.";
    }
    if (lista.length >= maximoJugadores) {
        return "Ya hay " + maximoJugadores + " candidatos, no caben más.";
    }
    return "";
}

function anadirNombre(lista, nombre) {
    let nueva = lista.slice();
    nueva.push(limpiarNombre(nombre));
    return nueva;
}

function quitarNombre(lista, posicion) {
    let nueva = lista.slice();
    nueva.splice(posicion, 1);
    return nueva;
}

function sePuedeJugar(lista) {
    return lista.length >= minimoJugadores;
}

function numeroSillas(lista) {
    if (lista.length == 0) {
        return 0;
    }
    return lista.length - 1;
}

function elegirPeter(lista) {
    return Math.floor(Math.random() * lista.length);
}

function esUltimaRonda(lista) {
    return lista.length == 2;
}

function partidaTerminada(lista) {
    return lista.length <= 1;
}

function caraDe(nombre, posicion) {
    let clave = quitarTildes(limpiarNombre(nombre));
    if (caras[clave]) {
        return caras[clave];
    }
    return carasGenericas[posicion % carasGenericas.length];
}

function colorDe(posicion) {
    return colores[posicion % colores.length];
}

if (typeof module != "undefined") {
    module.exports = {
        maximoJugadores: maximoJugadores,
        ejemplo: ejemplo,
        quitarTildes: quitarTildes,
        limpiarNombre: limpiarNombre,
        estaRepetido: estaRepetido,
        validarNombre: validarNombre,
        anadirNombre: anadirNombre,
        quitarNombre: quitarNombre,
        sePuedeJugar: sePuedeJugar,
        numeroSillas: numeroSillas,
        elegirPeter: elegirPeter,
        esUltimaRonda: esUltimaRonda,
        partidaTerminada: partidaTerminada,
        caraDe: caraDe,
        colorDe: colorDe
    };
}
