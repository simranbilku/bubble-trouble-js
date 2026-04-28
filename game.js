const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// adjusts canvas size in case of device rotation or windows resize

const player = {
  width: 40,
  height: 100,
};

player.x = (canvas.width - player.width) / 2;
player.y = canvas.height - player.height;

function drawRectangle() {
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.width, player.height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas
  drawRectangle();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
