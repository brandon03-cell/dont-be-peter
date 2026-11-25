let inGame = [];
let eliminated = [];
let round = 1;
let roundTime = 0;
let peterPosition = -1;
let timer = null;
let slowDownTimer = null;
let alertTimer = null;

function startMusic() {
  musicPlaying = true;
  backgroundMusic = false;
  music.playbackRate = 1;
  music.volume = 0.5;
  document.getElementById("bannerText").textContent = "¡A bailar!";
  if (soundOn) {
    music.play();
  }
  document.getElementById("ring").classList.add("spinning");
  document.getElementById("scene").classList.add("playing");
  document.getElementById("stopButton").textContent = "Parar música";
}

function stopMusic() {
  musicPlaying = false;
  backgroundMusic = false;
  music.pause();
  music.playbackRate = 1;
  document.getElementById("ring").classList.remove("spinning");
  document.getElementById("scene").classList.remove("playing");
}
function createHead(name, position) {
  let box = document.createElement("div");
  box.className = "playerInner";

  let img = document.createElement("img");
  img.src = faceOf(name, position);
  img.alt = "Cara de " + name;
  img.className = "face";
  box.appendChild(img);

  let label = document.createElement("p");
  label.className = "label";
  label.textContent = name;
  box.appendChild(label);

  return box;
}

function renderRoom() {
  let chairs = chairCount(inGame);

  document.getElementById("roundText").textContent = "Ronda " + round;
  document.getElementById("hudRound").textContent = round;
  document.getElementById("hudChairs").textContent = chairs;
  document.getElementById("hudTime").textContent = roundTime;
  document.getElementById("spotlight").classList.remove("lit");

  let text = inGame.length + " jugadores · " + chairs + " sillas";
  if (inGame.length == 1) {
    text = "1 jugador · 0 sillas";
  } else if (chairs == 1) {
    text = inGame.length + " jugadores · 1 silla";
  }
  document.getElementById("playersText").textContent = text;

  if (inGame.length == 1) {
    document.getElementById("tableText").innerHTML = "¡Ha ganado<br>" + inGame[0] + "!";
  } else if (isLastRound(inGame)) {
    document.getElementById("tableText").innerHTML = "¡Última<br>ronda!";
  } else {
    document.getElementById("tableText").innerHTML = chairs + " sillas<br>" + inGame.length + " personas";
  }

  let chips = document.getElementById("playerChips");
  chips.innerHTML = "";
  for (let i = 0; i < players.length; i++) {
    let chip = document.createElement("span");
    if (eliminated.indexOf(players[i]) == -1) {
      chip.className = "chip";
      chip.innerHTML = '<span class="chipCushion"></span>';
    } else {
      chip.className = "chip chipOut";
      chip.innerHTML = '<span class="chipCushion"></span>';
    }
    chip.appendChild(document.createTextNode(players[i]));
    chips.appendChild(chip);
  }

  let speed = 10 - round;
  if (speed < 3) {
    speed = 3;
  }

  let ring = document.getElementById("ring");
  ring.innerHTML = "";
  ring.style.animationDuration = speed + "s";
  for (let j = 0; j < inGame.length; j++) {
    let angle = (2 * Math.PI * j) / inGame.length - Math.PI / 2;
    if (inGame.length == 1) {
      angle = -Math.PI / 4;
    }
    let player = document.createElement("div");
    player.className = "player";
    player.style.left = 50 + 37 * Math.cos(angle) + "%";
    player.style.top = 52 + 34 * Math.sin(angle) + "%";
    let inner = createHead(inGame[j], players.indexOf(inGame[j]));
    inner.style.animationDuration = speed + "s";
    player.appendChild(inner);
    ring.appendChild(player);
  }

  let totalChairs = chairCount(players);
  let chairsBox = document.getElementById("chairs");
  chairsBox.innerHTML = "";
  for (let k = 0; k < totalChairs; k++) {
    let chairAngle = (2 * Math.PI * k) / totalChairs - Math.PI / 2;
    let chair = document.createElement("img");
    chair.alt = "";
    if (k < chairs) {
      chair.src = "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462143/silla.svg";
      chair.className = "chair";
    } else {
      chair.src = "https://res.cloudinary.com/do4k9fww6/image/upload/v1795586692/sillaRetirada.png";
      chair.className = "chair chairRemoved";
    }
    chair.style.left = 50 + 25 * Math.cos(chairAngle) + "%";
    chair.style.top = 52 + 25 * Math.sin(chairAngle) + "%";
    chairsBox.appendChild(chair);
  }
}
function startGame() {
  inGame = players.slice();
  eliminated = [];
  round = 1;
  roundTime = 0;
  peterPosition = -1;
  document.getElementById("stopButton").disabled = false;
  document.getElementById("changeRecordButton").disabled = false;
  showScreen("roomScreen");
  renderRoom();
  startMusic();
}

function stopAndPick() {
  if (!musicPlaying) {
    startMusic();
    return;
  }

  document.getElementById("stopButton").disabled = true;
  document.getElementById("changeRecordButton").disabled = true;
  document.getElementById("bannerText").textContent = "¡A tu silla!";


  slowDownTimer = setInterval(function () {
    music.playbackRate = music.playbackRate - 0.1;
    if (music.playbackRate <= 0.4) {
      clearInterval(slowDownTimer);
      stopMusic();
      pickAndSeat();
    }
  }, 120);
}

function pickAndSeat() {
  peterPosition = pickPeter(inGame);
  seatPlayers();
  playSound("peter");

  alertTimer = setTimeout(function () {
    let name = inGame[peterPosition];
    let remaining = inGame.length - 1;
    let text = name + " se ha quedado sin silla. Hoy le toca ser Peter. Quedan " + remaining + ".";
    if (remaining == 2) {
      text = text + " ¡La próxima es la última ronda!";
    }
    dialogMode = "peter";
    playSound("alert");
    let face = faceOf(name, players.indexOf(name));
    openDialog("Ronda " + round + " · ¡Ese es Peter!", text, "Siguiente ronda", false, face);
  }, 1800);
}


function seatPlayers() {
  let heads = document.querySelectorAll("#ring .player");
  let totalChairs = chairCount(players);
  let chair = 0;

  for (let i = 0; i < heads.length; i++) {
    if (i == peterPosition) {
      heads[i].style.left = "50%";
      heads[i].style.top = "47%";
      heads[i].classList.add("peter");
    } else {
      let angle = (2 * Math.PI * chair) / totalChairs - Math.PI / 2;
      heads[i].style.left = 50 + 25 * Math.cos(angle) + "%";
      heads[i].style.top = 50 + 25 * Math.sin(angle) + "%";
      heads[i].classList.add("seated");
      chair = chair + 1;
    }
  }

  document.getElementById("tableText").innerHTML = "";
  document.getElementById("spotlight").classList.add("lit");
}

function nextRound() {
  eliminated.push(inGame[peterPosition]);
  inGame = removeName(inGame, peterPosition);
  peterPosition = -1;
  document.getElementById("stopButton").disabled = false;
  document.getElementById("changeRecordButton").disabled = false;

  if (isGameOver(inGame)) {
    renderRoom();
    dialogMode = "final";
    playSound("final");
    openDialog(
      "Fin de la partida",
      "Solo quedas tú, " + inGame[0] + ". Has sobrevivido a todos. Soledad incluida.",
      "Jugar otra vez",
      true,
      faceOf(inGame[0], players.indexOf(inGame[0]))
    );
    startCountdown();
    return;
  }

  round = round + 1;
  roundTime = 0;
  renderRoom();
  startMusic();
}
timer = setInterval(function () {
  if (musicPlaying) {
    roundTime = roundTime + 1;
    document.getElementById("hudTime").textContent = roundTime;
  }
}, 1000);

document.getElementById("stopButton").addEventListener("click", function () {
  stopAndPick();
});

document.getElementById("changeRecordButton").addEventListener("click", function () {
  playSound("click");
  goToJukebox();
});

document.addEventListener("keydown", function (event) {
  let inRoom = document.getElementById("roomScreen").classList.contains("active");
  let dialogOpen = document.getElementById("dialog").classList.contains("open");
  if (!inRoom || dialogOpen) {
    return;
  }
  if (event.key == " " && event.target.tagName != "BUTTON") {
    event.preventDefault();
    if (!document.getElementById("stopButton").disabled) {
      stopAndPick();
    }
  }
});