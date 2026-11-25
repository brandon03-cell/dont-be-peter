
let songs = [
  { title: "Stage Select", author: "Juhani Junkala", file: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795529256/stageSelect_1_ifkskc.ogg", color: "#ffd23f" },
  { title: "Stage 1", author: "Juhani Junkala", file: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528862/stage1_jvhgfp.ogg", color: "#e03c3c" },
  { title: "Stage 2", author: "Juhani Junkala", file: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528867/stage2_htmrft.ogg", color: "#4caf50" },
  { title: "Boss Fight", author: "Juhani Junkala", file: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528869/bossFight_dfam1f.ogg", color: "#3c6fe0" },
  { title: "Title Screen", author: "Juhani Junkala", file: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795529254/titleScreen_1_bpwbwc.ogg", color: "#e88bb0" },
  { title: "Level 1", author: "Juhani Junkala", file: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528860/level1_uvm1aq.ogg", color: "#e07b28" },
  { title: "Level 2", author: "Juhani Junkala", file: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528861/level2_lwte8c.ogg", color: "#ffd23f" },
  { title: "Level 3", author: "Juhani Junkala", file: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528863/level3_n17tq8.ogg", color: "#e03c3c" },
  { title: "Ending", author: "Juhani Junkala", file: "https://res.cloudinary.com/dmonwbtuz/video/upload/v1795528865/ending_jraxde.ogg", color: "#4caf50" }
];

let songsPerPage = 4;
let currentSong = 0;
let currentRecordsPage = 0;
let jukeboxPlaying = false;
let cameFromRoom = false;

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function songCode(position, perPage) {
  let letter = letters[Math.floor(position / perPage)];
  let number = (position % perPage) + 1;
  return letter + number;
}

function totalPages(total, perPage) {
  if (total == 0) {
    return 1;
  }
  return Math.ceil(total / perPage);
}

function pageOf(position, perPage) {
  return Math.floor(position / perPage);
}

function nextPosition(position, total) {
  return (position + 1) % total;
}

function previousPosition(position, total) {
  return (position - 1 + total) % total;
}

function formatTime(seconds) {
  if (!isFinite(seconds)) {
    return "0:00";
  }
  let minutes = Math.floor(seconds / 60);
  let remainder = Math.floor(seconds % 60);
  if (remainder < 10) {
    remainder = "0" + remainder;
  }
  return minutes + ":" + remainder;
}

function renderSong() {
  let song = songs[currentSong];
  document.getElementById("songTitle").textContent = song.title;
  document.getElementById("songAuthor").textContent = song.author;
  document.getElementById("recordLabel").textContent = songCode(currentSong, songsPerPage);
  document.getElementById("recordLabel").style.backgroundColor = song.color;

  let info = document.getElementById("nowPlaying");
  info.classList.remove("appear");
  setTimeout(function () {
    info.classList.add("appear");
  }, 10);
}

function renderRecords() {
  let list = document.getElementById("songList");
  list.innerHTML = "";

  let start = currentRecordsPage * songsPerPage;
  for (let i = start; i < start + songsPerPage; i++) {
    let slot = document.createElement("li");

    if (i < songs.length) {
      let card = document.createElement("button");
      card.className = "recordTile";
      if (i == currentSong) {
        card.className = "recordTile recordTileSelected";
      }

      let code = document.createElement("span");
      code.className = "recordTileCode";
      code.textContent = songCode(i, songsPerPage);
      card.appendChild(code);

      let title = document.createElement("span");
      title.textContent = songs[i].title;
      card.appendChild(title);

      card.dataset.song = i;
      card.addEventListener("click", function () {
        playSound("click");
        let selected = Number(this.dataset.song);
        if (selected == currentSong) {
          togglePause();
        } else {
          playSong(selected);
        }
      });
      slot.appendChild(card);
    } else {
      slot.className = "recordTile recordTileEmpty";
      slot.textContent = "Libre";
    }

    list.appendChild(slot);
  }

  let pages = totalPages(songs.length, songsPerPage);
  document.getElementById("pageText").textContent =
    "Página " + letters[currentRecordsPage] + " · " + (currentRecordsPage + 1) + " de " + pages;
}

function loadSong(position) {
  currentSong = position;
  currentRecordsPage = pageOf(currentSong, songsPerPage);
  music.src = songs[currentSong].file;
  localStorage.setItem("jukeboxSong", currentSong);
  renderSong();
  renderRecords();
  renderTime();
}

function playJukebox() {
  jukeboxPlaying = true;
  music.volume = 0.5;
  if (soundOn) {
    music.play();
  }
  document.getElementById("jukeboxScene").classList.add("playing");
  document.getElementById("songStatus").textContent = "Sonando";
}

function pauseJukebox() {
  jukeboxPlaying = false;
  music.pause();
  document.getElementById("jukeboxScene").classList.remove("playing");
  document.getElementById("songStatus").textContent = "En pausa";
}

function playSong(position) {
  loadSong(position);
  playJukebox();
}

function togglePause() {
  if (jukeboxPlaying) {
    pauseJukebox();
  } else {
    playJukebox();
  }
}

function nextSong() {
  playSong(nextPosition(currentSong, songs.length));
}

function previousSong() {
  playSong(previousPosition(currentSong, songs.length));
}

function changeRecordsPage(offset) {
  let pages = totalPages(songs.length, songsPerPage);
  currentRecordsPage = (currentRecordsPage + offset + pages) % pages;
  renderRecords();
}

function renderTime() {
  let percentage = 0;
  if (music.duration > 0) {
    percentage = (music.currentTime / music.duration) * 100;
  }
  document.getElementById("progressFill").style.width = percentage + "%";
  document.getElementById("songTime").textContent =
    formatTime(music.currentTime) + " / " + formatTime(music.duration);
}

function loadSavedSong() {
  let saved = localStorage.getItem("jukeboxSong");
  if (saved != null && Number(saved) < songs.length) {
    currentSong = Number(saved);
  }
  loadSong(currentSong);
}

function goToJukebox() {
  cameFromRoom = document.getElementById("roomScreen").classList.contains("active");
  stopMusic();
  music.loop = false;
  currentRecordsPage = pageOf(currentSong, songsPerPage);
  renderRecords();

  if (cameFromRoom) {
    document.getElementById("backToGameButton").classList.remove("hidden");
  } else {
    document.getElementById("backToGameButton").classList.add("hidden");
  }
  showScreen("jukeboxScreen");
}

function leaveJukebox() {
  pauseJukebox();
  music.loop = true;
}

function setupJukebox() {
  document.getElementById("jukeboxBackButton").addEventListener("click", function () {
    playSound("click");
    leaveJukebox();
    goToMenu();
  });

  document.getElementById("backToGameButton").addEventListener("click", function () {
    playSound("click");
    leaveJukebox();
    showScreen("roomScreen");
    startMusic();
  });

  document.getElementById("record").addEventListener("click", function () {
    playSound("click");
    togglePause();
  });

  document.getElementById("progressBar").addEventListener("click", function (event) {
    if (music.duration > 0) {
      music.currentTime = (event.offsetX / this.offsetWidth) * music.duration;
    }
  });

  document.getElementById("previousPage").addEventListener("click", function () {
    playSound("click");
    changeRecordsPage(-1);
  });

  document.getElementById("nextPage").addEventListener("click", function () {
    playSound("click");
    changeRecordsPage(1);
  });

  music.addEventListener("timeupdate", renderTime);
  music.addEventListener("loadedmetadata", renderTime);

  music.addEventListener("ended", function () {
    nextSong();
  });

  music.addEventListener("error", function () {
    document.getElementById("songStatus").textContent = "No se encuentra";
  });

  document.addEventListener("keydown", function (event) {
    let inJukebox = document.getElementById("jukeboxScreen").classList.contains("active");
    if (!inJukebox) {
      return;
    }
    if (event.key == " " && event.target.tagName != "BUTTON") {
      event.preventDefault();
      togglePause();
    } else if (event.key == "ArrowRight") {
      nextSong();
    } else if (event.key == "ArrowLeft") {
      previousSong();
    }
  });
}

if (typeof module != "undefined") {
  module.exports = {
    songCode: songCode,
    totalPages: totalPages,
    pageOf: pageOf,
    nextPosition: nextPosition,
    previousPosition: previousPosition,
    formatTime: formatTime
  };
} else {
  setupJukebox();
}