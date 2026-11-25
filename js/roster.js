
let pins = [
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169966/chincheta_roja_hndirn.svg",
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169967/chincheta_azul_gyckgk.svg",
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169967/chincheta_verde_k2yvjs.svg",
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169968/chincheta_rosa_so5aoj.svg",
    "https://res.cloudinary.com/daul6tzck/image/upload/v1795169966/chincheta_amarilla_tawd7l.svg"
];

function renderRoster() {
    let list = document.getElementById("cardList");
    list.innerHTML = "";

for (let i = 0; i < players.length; i++) {
    let card = document.createElement("li");
    card.className = "card";

    let pin = document.createElement("img");
    pin.className = "cardPin";
    pin.src = pins[i % pins.length];
    pin.alt = "";
    card.appendChild(pin);

    let number = document.createElement("span");
    number.className = "cardNumber";
    if (i < 9) {
        number.textContent = "0" + (i + 1);
    } else {
        number.textContent = i + 1;
    }
    card.appendChild(number);

    let color = document.createElement("span");
    color.className = "cardColor";
    color.style.backgroundColor = colorOf(i);
    card.appendChild(color);

    let face = document.createElement("img");
    face.className = "cardFace";
    face.src = faceOf(players[i], i);
    face.alt = "Cara de " + players[i];
    card.appendChild(face);

    let name = document.createElement("p");
    name.className = "label";
    name.textContent = players[i];
    card.appendChild(name);

    let removeButton = document.createElement("button");
    removeButton.className = "removeButton";
    removeButton.innerHTML = '<img src="https://res.cloudinary.com/daul6tzck/image/upload/v1795169968/papelera_l93csq.svg" alt=""><span class="removeButtonText">Quitar</span>';
    removeButton.setAttribute("aria-label", "Quitar a " + players[i]);
    removeButton.dataset.position = i;
    removeButton.addEventListener("click", function () {
        players = removeName(players, Number(this.dataset.position));
        save();
        playSound("remove");
        renderRoster();
    });
    card.appendChild(removeButton);

    list.appendChild(card);
}

if (players.length == 0) {
    document.getElementById("corkboardEmpty").classList.remove("hidden");
} else {
    document.getElementById("corkboardEmpty").classList.add("hidden");
}

let chairs = chairCount(players);
document.getElementById("counterNumber").textContent = players.length;
if (players.length == 1) {
    document.getElementById("counterText").textContent = "jugador";
    document.getElementById("candidatesText").textContent = "1 candidato";
} else {
    document.getElementById("counterText").textContent = "jugadores";
    document.getElementById("candidatesText").textContent = players.length + " candidatos";
}
if (chairs == 1) {
    document.getElementById("counterChairs").textContent = "= 1 silla";
} else {
    document.getElementById("counterChairs").textContent = "= " + chairs + " sillas";
}

let row = document.getElementById("chairsRow");
row.innerHTML = "";
for (let j = 0; j < chairs; j++) {
    let chair = document.createElement("img");
    chair.src = "https://res.cloudinary.com/daul6tzck/image/upload/v1795169970/silla_icono_dyud6w.svg";
    chair.alt = "";
    row.appendChild(chair);
}

    document.getElementById("playButton").disabled = !canPlay(players);
}

function showError(text) {
    let field = document.getElementById("nameField");
        document.getElementById("errorMessage").textContent = text;
    if (text == "") {
        field.classList.remove("fieldError");
    } else {
        field.classList.add("fieldError");
    }
}

function goToRoster() {
    renderRoster();
    showError("");
    showScreen("rosterScreen");
}

document.getElementById("nameForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let field = document.getElementById("nameField");
    let error = validateName(players, field.value);
    if (error != "") {
        showError(error);
        playSound("remove");
        return;
    }
    players = addName(players, field.value);
    save();
    playSound("add");
    showError("");
    field.value = "";
    field.focus();
    renderRoster();
});

function loadSample() {
    players = sample.slice();
    save();
    playSound("add");
    showError("");
    renderRoster();
}

document.getElementById("sampleButton").addEventListener("click", loadSample);
document.getElementById("sampleButtonMobile").addEventListener("click", loadSample);

document.getElementById("playButton").addEventListener("click", function () {
    if (!canPlay(players)) {
        showError("Hacen falta al menos 2 jugadores.");
        return;
    }
    startGame();
});

document.getElementById("rosterBackButton").addEventListener("click", function () {
    playSound("click");
    goToMenu();
});