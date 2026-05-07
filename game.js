// canvas set up
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const isMobile = window.innerWidth < 480;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 175;

// adjusts canvas size in case of device rotation or windows resize
const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 175;
};

window.addEventListener("resize", resizeCanvas);

// player
const player = {
  width: isMobile ? 25 : 40,
  height: isMobile ? 60 : 100,
};

player.x = (canvas.width - player.width) / 2;
player.y = canvas.height - player.height;
player.speed = 5;

// bubble
const largeRadius = isMobile ? 30 : 60;
const mediumRadius = isMobile ? 20 : 40;
const smallRadius = isMobile ? 10 : 20;

const randomXPosition = (width, radius) => {
  return Math.floor(Math.random() * (width - radius * 3)) + radius * 2;
};

const createBubble = ({
  x = randomXPosition(canvas.width, largeRadius),
  y = largeRadius,
  radius = largeRadius,
  xSpeed = 1,
  ySpeed = 3.5,
} = {}) => ({
  x,
  y,
  radius,
  xSpeed,
  ySpeed,
});

let bubbles = [
  createBubble({
    radius: largeRadius,
    ySpeed: 3.5,
  }),
];

// game state
let gameOver = false;
let gameStarted = false;
let score = 0;

// button tracker
const buttonTracker = {
  left: false,
  right: false,
  shoot: false,
  start: false,
};

const left = document.getElementById("leftBtn");
const right = document.getElementById("rightBtn");
const shoot = document.getElementById("shootBtn");
const restart = document.getElementById("restartBtn");
const start = document.getElementById("startBtn");

// event listeners
const addPressListeners = (element, key) => {
  ["mousedown", "touchstart"].forEach((eventType) => {
    element.addEventListener(eventType, () => {
      buttonTracker[key] = true;
    });
  });

  ["mouseup", "touchend"].forEach((eventType) => {
    element.addEventListener(eventType, () => {
      buttonTracker[key] = false;
    });
  });
};

addPressListeners(left, "left");
addPressListeners(right, "right");
addPressListeners(shoot, "shoot");

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    buttonTracker.left = true;
    event.preventDefault();
  } else if (event.key === "ArrowRight") {
    buttonTracker.right = true;
    event.preventDefault();
  } else if (event.key === " ") {
    buttonTracker.shoot = true;
    event.preventDefault();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    buttonTracker.left = false;
  } else if (event.key === "ArrowRight") {
    buttonTracker.right = false;
  } else if (event.key === " ") {
    buttonTracker.shoot = false;
    event.preventDefault();
  }
});

// game reset / start
const resetGame = (ySpeed = 1.5) => {
  gameOver = false;
  player.x = (canvas.width - player.width) / 2;

  bubbles = [
    createBubble({
      radius: largeRadius,
      ySpeed,
    }),
  ];

  score = 0;
  laser.active = false;
};

const restartHandler = () => {
  const wasGameOver = gameOver;

  resetGame();

  if (wasGameOver) {
    requestAnimationFrame(gameLoop);
  }
};

["mousedown", "touchstart"].forEach((eventType) => {
  restart.addEventListener(eventType, restartHandler);
});

const startHandler = () => {
  gameStarted = true;
  resetGame();

  start.classList.add("hidden");
  left.classList.remove("hidden");
  right.classList.remove("hidden");
  shoot.classList.remove("hidden");
  restart.classList.remove("hidden");

  requestAnimationFrame(gameLoop);
};

["mousedown", "touchstart"].forEach((eventType) => {
  start.addEventListener(eventType, startHandler);
});

// laser
const laser = {
  active: false,
  x: player.x + player.width / 2,
};

// draw on canvas
const drawLaser = () => {
  ctx.beginPath(); // begin path
  ctx.moveTo(player.x + player.width / 2, player.y - player.width / 2); // move to a point
  ctx.lineTo(player.x + player.width / 2, 0); // draw in the path, x-axis coordinate of line's end point, y-axis coordinate of line's end point
  ctx.strokeStyle = "#ff0055";
  ctx.lineWidth = 2;
  ctx.stroke(); // draw the path
};

const drawStickman = () => {
  ctx.strokeStyle = "#ffffff";
  ctx.shadowColor = "#ffffff";
  ctx.shadowBlur = 10;
  ctx.lineWidth = 2;

  // body
  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y + player.width / 2);
  ctx.lineTo(
    player.x + player.width / 2,
    player.y + player.width / 2 + player.height / 2,
  );
  ctx.stroke();

  // head
  ctx.moveTo(player.x + player.width / 2, player.y + player.width);
  ctx.beginPath();
  ctx.arc(
    player.x + player.width / 2,
    player.y,
    player.width / 2,
    0,
    2 * Math.PI,
  );

  // left leg
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(
    player.x + player.width / 2,
    player.y + player.width / 2 + player.height / 2,
  );
  ctx.lineTo(player.x, player.y + player.height);
  ctx.stroke();

  // right leg
  ctx.moveTo(
    player.x + player.width / 2,
    player.y + player.width / 2 + player.height / 2,
  );
  ctx.lineTo(player.x + player.width, player.y + player.height);
  ctx.stroke();

  // left arm
  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y + player.height / 2.5);
  ctx.lineTo(player.x, player.y + player.height / 1.8);
  ctx.stroke();

  // right arm
  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y + player.height / 2.5);
  ctx.lineTo(player.x + player.width, player.y + player.height / 1.8);
  ctx.stroke();

  ctx.shadowBlur = 0;
};

const drawBubbles = () => {
  bubbles.forEach((bubble) => {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#39ff14";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.stroke();
  });
};

// ui text on canvas
const displayGameOver = () => {
  ctx.font = `bold ${isMobile ? "30px" : "50px"} 'Courier New'`;
  ctx.fillStyle = "#ff0055";
  ctx.shadowColor = "#ff0055";
  ctx.shadowBlur = 20;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
  ctx.shadowBlur = 0;
};

const displayYouWin = () => {
  ctx.font = `bold ${isMobile ? "30px" : "50px"} 'Courier New'`;
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#ffffff";
  ctx.shadowBlur = 20;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("You Win!", canvas.width / 2, canvas.height / 2);
  ctx.shadowBlur = 0;
};

const displayScore = () => {
  ctx.font = "bold 20px 'Courier New'";
  ctx.fillStyle = "#ff0055";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#ff0055";
  ctx.lineWidth = 2;
  ctx.shadowBlur = 10;
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${score}`, 20, 30);
  ctx.shadowBlur = 0;
};

// game loop
const gameLoop = () => {
  if (gameOver || !gameStarted) {
    return;
  }

  ctx.fillStyle = "#0a0a1a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  laser.active = buttonTracker.shoot;

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

        if (bubble.radius === largeRadius) {
          newBubbles.push(
            createBubble({
              x: laser.x,
              y: bubble.y,
              radius: mediumRadius,
              xSpeed: 1,
            }),
            createBubble({
              x: laser.x,
              y: bubble.y,
              radius: mediumRadius,
              xSpeed: -1,
            }),
          );
        } else if (bubble.radius === mediumRadius) {
          newBubbles.push(
            createBubble({
              x: laser.x,
              y: bubble.y,
              radius: smallRadius,
              xSpeed: 1,
            }),
            createBubble({
              x: laser.x,
              y: bubble.y,
              radius: smallRadius,
              xSpeed: -1,
            }),
          );
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
    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

  drawStickman();
  drawBubbles();
  displayScore();

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
