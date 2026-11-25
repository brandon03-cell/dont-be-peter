let players = [];
let soundOn = true;
let musicPlaying = false;
let backgroundMusic = false;

let music = new Audio();
music.loop = true;
music.volume = 0.5;
music.preservesPitch = false;

let sounds = {
  click: new Audio("https://res.cloudinary.com/do4k9fww6/video/upload/v1795462140/clic.ogg"),
  add: new Audio("https://res.cloudinary.com/do4k9fww6/video/upload/v1795555360/anadir.ogg"),
  remove: new Audio("https://res.cloudinary.com/do4k9fww6/video/upload/v1795555361/borrar.ogg"),
  alert: new Audio("https://res.cloudinary.com/do4k9fww6/video/upload/v1795555361/aviso.ogg"),
  peter: new Audio("https://res.cloudinary.com/do4k9fww6/video/upload/v1795555361/peter.ogg"),
  final: new Audio("https://res.cloudinary.com/do4k9fww6/video/upload/v1795555361/final.ogg")
};

function playSound(name) {
  if (!soundOn || !sounds[name]) {
    return;
  }
  let sound = sounds[name];
  sound.currentTime = 0;
  sound.play();
}

function toggleSound() {
  soundOn = !soundOn;
  if (soundOn) {
    if (musicPlaying || backgroundMusic) {
      music.play();
    }
  } else {
    music.pause();
  }
  renderSound();
}

function renderSound() {
  let menuButton = document.getElementById("menuSoundButton");
  let icon = document.getElementById("menuSoundIcon");

  if (soundOn) {
    document.getElementById("soundButton").textContent = "Sonido";
    icon.src = "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462138/altavoz.svg";
    menuButton.setAttribute("aria-label", "Quitar la música");
  } else {
    document.getElementById("soundButton").textContent = "Sin sonido";
    icon.src = "https://res.cloudinary.com/do4k9fww6/image/upload/v1795462138/altavozMudo.svg";
    menuButton.setAttribute("aria-label", "Poner la música");
  }
}

function showScreen(id) {
  let screens = document.querySelectorAll(".screen");
  for (let i = 0; i < screens.length; i++) {
    screens[i].classList.remove("active");
  }
  document.getElementById(id).classList.add("active");

  if (id == "rosterScreen" || id == "roomScreen") {
    document.getElementById("topBar").classList.remove("hidden");
    document.body.classList.add("withBar");
  } else {
    document.getElementById("topBar").classList.add("hidden");
    document.body.classList.remove("withBar");
  }

  window.scrollTo(0, 0);
}

function save() {
  localStorage.setItem("players", JSON.stringify(players));
}

function load() {
  let saved = localStorage.getItem("players");
  if (saved) {
    players = JSON.parse(saved);
  }
}

document.getElementById("soundButton").addEventListener("click", toggleSound);

document.getElementById("resetButton").addEventListener("click", function () {
  let confirmed = confirm("¿Reiniciar la empresa? Se borra la hoja de reparto.");
  if (!confirmed) {
    return;
  }
  localStorage.removeItem("players");
  players = [];
  showScreen("welcomeScreen");
});

document.addEventListener("DOMContentLoaded", function () {
  load();
  showScreen("welcomeScreen");
});