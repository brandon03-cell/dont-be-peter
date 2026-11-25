let dialogMode = "";
let countdown = 0;
let endTimer = null;

function openDialog(title, text, button, final, face) {
  document.getElementById("dialogTitle").textContent = title;
  document.getElementById("dialogText").textContent = text;
  document.getElementById("dialogButton").textContent = button;
  document.getElementById("dialogFace").src = face;
  if (final) {
    document.getElementById("dialogBox").classList.add("dialogFinal");
    document.getElementById("dialogStamp").textContent = "Gana";
  } else {
    document.getElementById("dialogBox").classList.remove("dialogFinal");
    document.getElementById("dialogStamp").textContent = "Peter";
    document.getElementById("dialogCountdown").textContent = "";
  }
  document.getElementById("dialog").classList.add("open");
  document.getElementById("dialogButton").focus();
}

function closeDialog() {
  document.getElementById("dialog").classList.remove("open");
  clearInterval(endTimer);
}

function startCountdown() {
  countdown = 10;
  document.getElementById("dialogCountdown").textContent = "Volviendo al inicio en " + countdown;
  endTimer = setInterval(function () {
    countdown = countdown - 1;
    document.getElementById("dialogCountdown").textContent = "Volviendo al inicio en " + countdown;
    if (countdown == 0) {
      closeDialog();
      goToMenu();
    }
  }, 1000);
}

document.getElementById("dialogButton").addEventListener("click", function () {
  playSound("click");
  closeDialog();
  if (dialogMode == "peter") {
    nextRound();
  } else {
    startGame();
  }
});