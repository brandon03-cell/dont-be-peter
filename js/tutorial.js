document.getElementById("tutorialStartButton").addEventListener("click", function () {
    playSound("click");
    goToRoster();
});

document.getElementById("tutorialBackButton").addEventListener("click", function () {
    playSound("click");
    goToMenu();
});