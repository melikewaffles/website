const button = document.getElementById("bigRedButton");
const sound = document.getElementById("buttonSound");

function pressButton() {
  button.classList.add("pressed");
}

function releaseButton() {
  button.classList.remove("pressed");
  sound.currentTime = 0;
  sound.play();
}

button.addEventListener("mousedown", pressButton);
button.addEventListener("mouseup", releaseButton);
button.addEventListener("mouseleave", () => button.classList.remove("pressed"));

// Touch support for mobile
button.addEventListener("touchstart", pressButton);
button.addEventListener("touchend", releaseButton);
