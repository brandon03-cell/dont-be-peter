function goToMenu() {
    showScreen("menuScreen");
}

document.getElementById("startButton").addEventListener("click", function () {
    playSound("click");
    goToRoster();
});

document.getElementById("musicButton").addEventListener("click", function () {
    playSound("click");
    goToJukebox();
});

document.getElementById("tutorialButton").addEventListener("click", function () {
    playSound("click");
    showScreen("tutorialScreen");
});

document.getElementById("creditsButton").addEventListener("click", function () {
    playSound("click");
    showScreen("creditsScreen");
});

document.getElementById("menuSoundButton").addEventListener("click", toggleSound);