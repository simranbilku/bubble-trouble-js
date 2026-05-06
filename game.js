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
player.speed = 5;

function drawRectangle() {
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.width, player.height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

const buttonTracker = {
  left: false,
  right: false,
  shoot: false,
};

const left = document.getElementById("leftBtn");
left.addEventListener("mousedown", function () {
  buttonTracker.left = true;
});
left.addEventListener("mouseup", function () {
  buttonTracker.left = false;
});
left.addEventListener("touchstart", function () {
  buttonTracker.left = true;
});
left.addEventListener("touchend", function () {
  buttonTracker.left = false;
});

const right = document.getElementById("rightBtn");
right.addEventListener("mousedown", function () {
  buttonTracker.right = true;
});
right.addEventListener("mouseup", function () {
  buttonTracker.right = false;
});
right.addEventListener("touchstart", function () {
  buttonTracker.right = true;
});
right.addEventListener("touchend", function () {
  buttonTracker.right = false;
});

window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    buttonTracker.left = true;
    event.preventDefault();
  } else if (event.key === "ArrowRight") {
    buttonTracker.right = true;
    event.preventDefault();
  }
});

window.addEventListener("keyup", function (event) {
  if (event.key === "ArrowLeft") {
    buttonTracker.left = false;
  } else if (event.key === "ArrowRight") {
    buttonTracker.right = false;
  }
});

const shoot = document.getElementById("shootBtn");
shoot.addEventListener("mousedown", function () {
  buttonTracker.shoot = true;
});
shoot.addEventListener("mouseup", function () {
  buttonTracker.shoot = false;
});
shoot.addEventListener("touchstart", function () {
  buttonTracker.shoot = true;
});
shoot.addEventListener("touchend", function () {
  buttonTracker.shoot = false;
});

window.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    buttonTracker.shoot = true;
    event.preventDefault();
  }
});

window.addEventListener("keyup", function (event) {
  if (event.key === " ") {
    buttonTracker.shoot = false;
    event.preventDefault();
  }
});

let gameOver = false;

const restart = document.getElementById("restartBtn");
restart.addEventListener("mousedown", function () {
  const wasGameOver = gameOver;
  gameOver = false;
  player.x = (canvas.width - player.width) / 2;
  bubbles = [
    {
      x: randomXPosition(),
      y: largeRadius,
      radius: largeRadius,
      xSpeed: 1,
      ySpeed: 3.5,
    },
  ];
  score = 0;
  laser.active = false;
  if (wasGameOver) {
    requestAnimationFrame(gameLoop);
  }
});
restart.addEventListener("touchstart", function () {
  gameOver = false;
  player.x = (canvas.width - player.width) / 2;
  bubbles = [
    {
      x: randomXPosition(),
      y: largeRadius,
      radius: largeRadius,
      xSpeed: 1,
      ySpeed: 3.5,
    },
  ];
  score = 0;
  laser.active = false;
  if (wasGameOver) {
    requestAnimationFrame(gameLoop);
  }
});

const largeRadius = 60;
const mediumRadius = 40;
const smallRadius = 20;

function randomXPosition() {
  return (
    Math.floor(Math.random() * (canvas.width - largeRadius + 1)) + largeRadius
  );
}

let bubbles = [
  {
    x: randomXPosition(),
    y: largeRadius,
    radius: largeRadius,
    xSpeed: 1,
    ySpeed: 3.5,
  },
];

function drawBubbles() {
  bubbles.forEach(function (bubble) {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

const laser = {
  active: false,
  x: player.x + player.width / 2,
};

function drawLaser() {
  ctx.beginPath(); // begin path
  ctx.moveTo(player.x + player.width / 2, player.y); // move to a point
  ctx.lineTo(player.x + player.width / 2, 0); // draw in the path, x-axis coordinate of line's end point, y-axis coordinate of line's end point
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke(); // draw the path
}

function displayGameOver() {
  ctx.font = "50px Arial";
  ctx.fillStyle = "Red";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
}

function displayYouWin() {
  ctx.font = "50px Arial";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("You Win!", canvas.width / 2, canvas.height / 2);
}

let score = 0;

function displayScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.fillText(`score: ${score}`, 20, 30);
}

function gameLoop() {
  if (gameOver) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas
  if (buttonTracker.left) {
    player.x -= player.speed;
    if (player.x < 0) {
      // if hit left wall
      player.x = 0;
    }
  }
  if (buttonTracker.right) {
    player.x += player.speed;
    if (player.x > canvas.width - player.width) {
      // if hit right wall
      player.x = canvas.width - player.width;
    }
  }
  for (let bubble of bubbles) {
    bubble.y += bubble.ySpeed;
    bubble.x += bubble.xSpeed;
    if (
      bubble.x - bubble.radius < 0 || // left wall
      bubble.x + bubble.radius > canvas.width // right wall
    ) {
      bubble.xSpeed = -bubble.xSpeed;
    }
    if (
      bubble.y + bubble.radius > canvas.height || // bottom of screen
      bubble.y - bubble.radius < 0 // top of screen
    ) {
      bubble.ySpeed = -bubble.ySpeed;
    }
  }
  if (buttonTracker.shoot) {
    laser.active = true;
  } else {
    laser.active = false;
  }
  let newBubbles = [];
  let hitOccured = false;
  if (laser.active) {
    laser.x = player.x + player.width / 2;
    drawLaser();
    bubbles = bubbles.filter((bubble) => {
      if (
        !hitOccured &&
        laser.x > bubble.x - bubble.radius &&
        laser.x < bubble.x + bubble.radius
      ) {
        buttonTracker.shoot = false;
        hitOccured = true;
        laser.active = false;
        score += 1;
        const mediumBubbleOne = {
          x: laser.x,
          y: bubble.y,
          radius: mediumRadius,
          xSpeed: 1,
          ySpeed: 3.5,
        };
        const mediumBubbleTwo = {
          x: laser.x,
          y: bubble.y,
          radius: mediumRadius,
          xSpeed: -1,
          ySpeed: 3.5,
        };
        const smallBubbleOne = {
          x: laser.x,
          y: bubble.y,
          radius: smallRadius,
          xSpeed: 1,
          ySpeed: 3.5,
        };
        const smallBubbleTwo = {
          x: laser.x,
          y: bubble.y,
          radius: smallRadius,
          xSpeed: -1,
          ySpeed: 3.5,
        };
        if (bubble.radius == largeRadius) {
          newBubbles.push(mediumBubbleOne);
          newBubbles.push(mediumBubbleTwo);
        } else if (bubble.radius == mediumRadius) {
          newBubbles.push(smallBubbleOne);
          newBubbles.push(smallBubbleTwo);
        } else {
          return false;
        }
        return false;
      }
      return true;
    });
    bubbles = bubbles.concat(newBubbles);
  }
  if (bubbles.length === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayYouWin();
    gameOver = true;
  }
  for (let bubble of bubbles) {
    // circle rectangle collision
    // finding the closest x coordinate on the rectangle to the circle's center
    let closestX = Math.max(
      player.x,
      Math.min(bubble.x, player.x + player.width),
    );
    // finding the closest y coordinate on rectangle to circle's center
    let closestY = Math.max(
      player.y,
      Math.min(bubble.y, player.y + player.height),
    );
    let dx = bubble.x - closestX; // horizontal distance from circle center to closest point
    let dy = bubble.y - closestY; // vertical distance from circle center to closest point
    if (dx * dx + dy * dy <= bubble.radius * bubble.radius) {
      displayGameOver();
      gameOver = true;
      break;
    }
  }
  drawRectangle();
  drawBubbles();
  displayScore();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
