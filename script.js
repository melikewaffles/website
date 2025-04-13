const button = document.getElementById("bigRedButton");
const sound = document.getElementById("buttonSound");

button.addEventListener("mouseup", () => {
  sound.currentTime = 0;
  sound.play();
});

button.addEventListener("touchend", () => {
  sound.currentTime = 0;
  sound.play();
});
