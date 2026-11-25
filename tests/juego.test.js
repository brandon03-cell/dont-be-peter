let juego = require("../js/juego.js");

test("no deja añadir un nombre vacío", function () {
    expect(juego.validarNombre([], "   ")).toBe("Escribe un nombre.");
});

test("no deja añadir nombres repetidos", function () {
    let lista = ["Brandon", "Julián"];
    expect(juego.validarNombre(lista, "brandon")).toBe("Ese nombre ya está en la hoja.");
    expect(juego.validarNombre(lista, "  Julian ")).toBe("Ese nombre ya está en la hoja.");
});

test("deja añadir un nombre nuevo", function () {
    let lista = ["Brandon"];
    expect(juego.validarNombre(lista, "Alba")).toBe("");
    let nueva = juego.anadirNombre(lista, "  Alba ");
    expect(nueva).toEqual(["Brandon", "Alba"]);
    expect(lista).toEqual(["Brandon"]);
});

test("no deja pasar de 12 jugadores", function () {
    let lista = [];
    for (let i = 0; i < 12; i++) {
        lista.push("Jugador " + i);
    }
    expect(juego.validarNombre(lista, "Otro")).not.toBe("");
});

test("quitar un nombre lo borra de la lista", function () {
    let lista = ["Brandon", "Alba", "Diego"];
    expect(juego.quitarNombre(lista, 1)).toEqual(["Brandon", "Diego"]);
});

test("hacen falta 2 jugadores para empezar", function () {
    expect(juego.sePuedeJugar(["Brandon"])).toBe(false);
    expect(juego.sePuedeJugar(["Brandon", "Alba"])).toBe(true);
});

test("siempre hay una silla menos que jugadores", function () {
    expect(juego.numeroSillas(["Brandon", "Alba", "Diego", "Manuel"])).toBe(3);
    expect(juego.numeroSillas([])).toBe(0);
});

test("elegirPeter devuelve una posición que existe", function () {
    let lista = ["Brandon", "Alba", "Diego"];
    for (let i = 0; i < 50; i++) {
        let posicion = juego.elegirPeter(lista);
        expect(posicion).toBeGreaterThanOrEqual(0);
        expect(posicion).toBeLessThan(lista.length);
    }
});

test("avisa de la última ronda y del final", function () {
    expect(juego.esUltimaRonda(["Brandon", "Alba"])).toBe(true);
    expect(juego.esUltimaRonda(["Brandon", "Alba", "Diego"])).toBe(false);
    expect(juego.partidaTerminada(["Brandon"])).toBe(true);
    expect(juego.partidaTerminada(["Brandon", "Alba"])).toBe(false);
});

test("los del equipo tienen su cara y los demás una genérica", function () {
    expect(juego.caraDe("Julián", 0)).toBe("https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/julian.png");
    expect(juego.caraDe("Pepe", 0)).toBe("https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/gorraAzul.png");
    expect(juego.caraDe("Pepe", 5)).toBe("https://res.cloudinary.com/do4k9fww6/image/upload/v1795462143/peloNaranja.png");
});
