let game = require("../js/game.js");

test("does not allow adding an empty name", function () {
    expect(game.validateName([], "   ")).toBe("Escribe un nombre.");
});

test("does not allow adding duplicate names", function () {
    let list = ["Brandon", "Julián"];
    expect(game.validateName(list, "brandon")).toBe("Ese nombre ya está en la hoja.");
    expect(game.validateName(list, "  Julian ")).toBe("Ese nombre ya está en la hoja.");
});

test("allows adding a new name", function () {
    let list = ["Brandon"];
    expect(game.validateName(list, "Alba")).toBe("");
    let newList = game.addName(list, "  Alba ");
    expect(newList).toEqual(["Brandon", "Alba"]);
    expect(list).toEqual(["Brandon"]);
});

test("does not allow more than 12 players", function () {
    let list = [];
    for (let i = 0; i < 12; i++) {
        list.push("Jugador " + i);
    }
    expect(game.validateName(list, "Otro")).not.toBe("");
});

test("removing a name deletes it from the list", function () {
    let list = ["Brandon", "Alba", "Diego"];
    expect(game.removeName(list, 1)).toEqual(["Brandon", "Diego"]);
});

test("2 players are needed to start", function () {
    expect(game.canPlay(["Brandon"])).toBe(false);
    expect(game.canPlay(["Brandon", "Alba"])).toBe(true);
});

test("there is always one chair fewer than players", function () {
    expect(game.chairCount(["Brandon", "Alba", "Diego", "Manuel"])).toBe(3);
    expect(game.chairCount([])).toBe(0);
});

test("pickPeter returns a position that exists", function () {
    let list = ["Brandon", "Alba", "Diego"];
    for (let i = 0; i < 50; i++) {
        let position = game.pickPeter(list);
        expect(position).toBeGreaterThanOrEqual(0);
        expect(position).toBeLessThan(list.length);
    }
});

test("detects the last round and the end", function () {
    expect(game.isLastRound(["Brandon", "Alba"])).toBe(true);
    expect(game.isLastRound(["Brandon", "Alba", "Diego"])).toBe(false);
    expect(game.isGameOver(["Brandon"])).toBe(true);
    expect(game.isGameOver(["Brandon", "Alba"])).toBe(false);
});

test("team members get their face and the rest a generic one", function () {
    expect(game.faceOf("Julián", 0)).toBe("https://res.cloudinary.com/do4k9fww6/image/upload/v1795462142/julian.png");
    expect(game.faceOf("Pepe", 0)).toBe("https://res.cloudinary.com/do4k9fww6/image/upload/v1795462141/gorraAzul.png");
    expect(game.faceOf("Pepe", 5)).toBe("https://res.cloudinary.com/do4k9fww6/image/upload/v1795462143/peloNaranja.png");
});
