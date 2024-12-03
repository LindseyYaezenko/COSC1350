/* ..:: B R E A K O U T   G A M E ::..
 *
 * breakout.js
 * Author: Lindsey Yaezenko 
 * Date: 11/12/2024
 * Project for COSC 1350
 *
 */


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Paddle properties
let xPaddle = canvas.width / 2 - 50;
const paddleWidth = 100;
const paddleHeight = 15;
const paddleY = canvas.height - paddleHeight;
let moveLeft = false;
let moveRight = false;

// Ball properties
const ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;
let xMoveDist = 2;
let yMoveDist = 2;

// Brick properties
const brickRows = 4;
const brickColumns = 6;
const brickWidth = 90;
const brickHeight = 25;
const brickPadding = 10;
const brickTopOffset = 40;
const brickLeftOffset = 5;
const bricks = [];

// Score and game state
let score = 0;
let gameOver = false;
let gameWin = false;

// Button properties
const buttonWidth = 165;
const buttonHeight = 40;
const buttonX = canvas.width / 2 - buttonWidth / 2;
const buttonY = canvas.height / 2 + 70;
let buttonVisible = false;

//Brick Array
for (let r = 0; r < brickRows; r++) {
  bricks[r] = [];
  for (let c = 0; c < brickColumns; c++) {
    const x = c * (brickWidth + brickPadding) + brickLeftOffset;
    const y = r * (brickHeight + brickPadding) + brickTopOffset;
    bricks[r][c] = { x, y, hit: false, color: `rgb(${200 - r * 40}, ${200 - r * 40}, ${200 - r * 40})` };
  }
}


// Event Listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveLeft = true;
  if (event.key === "ArrowRight") moveRight = true;
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") moveLeft = false;
  if (event.key === "ArrowRight") moveRight = false;
});

canvas.addEventListener("click", (event) => {
  const clickX = event.offsetX;
  const clickY = event.offsetY;

  if (
    buttonVisible &&
    clickX > buttonX &&
    clickX < buttonX + buttonWidth &&
    clickY > buttonY &&
    clickY < buttonY + buttonHeight
  ) {
    resetGame();
  }
});


//Functions

// Render the ball on the canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(xPos, yPos, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
}

// Render the paddle on the canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(xPaddle, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

//Render the bricks
function drawBricks() {
  for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
      const brick = bricks[r][c];
      if (!brick.hit) {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}
//show score
function drawScore() {
  ctx.font = "bold 16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

//Game Over
function drawGameOver() {
  ctx.font = "bold 30px Lucida Handwriting";
  ctx.fillStyle = gameWin ? "green" : "red";
  ctx.fillText(gameWin ? "You Win!" : "Game Over", canvas.width / 2 - 75, canvas.height / 2 - 20);

  ctx.font = "bold 20px Lucida Handwriting";
  ctx.fillStyle = "white";
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 65, canvas.height / 2 + 10);

  //reset button
  ctx.beginPath();
  ctx.rect(buttonX, buttonY, buttonWidth, buttonHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();

  ctx.font = "bold 20px Lucida Handwriting";
  ctx.fillStyle = "white";
  ctx.fillText("Play Again", buttonX + 15, buttonY + 25);
}



// Update the ball's positiion and handle wall collisions
function updateBallPosition() {
  xPos += xMoveDist;
  yPos += yMoveDist;

  
  if (xPos + ballRadius > canvas.width || xPos - ballRadius < 0) xMoveDist = -xMoveDist;
  if (yPos - ballRadius < 0) yMoveDist = -yMoveDist;


  if (yPos + ballRadius > paddleY && 
    xPos > xPaddle && 
    xPos < xPaddle + paddleWidth) {
    yMoveDist = -yMoveDist;
  }

// Update paddle position based on key pressed
  if (yPos + ballRadius > canvas.height) {
    gameOver = true;
    buttonVisible = true;
  }
}

function updatePaddlePosition() {
  if (moveLeft && xPaddle > 0) xPaddle -= 3;
  if (moveRight && xPaddle < canvas.width - paddleWidth) xPaddle += 3;
}

function checkBrickCollision() {
  let allBricksCleared = true;
  for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
      const brick = bricks[r][c];
      if (!brick.hit) {
        allBricksCleared = false;
        if (
          xPos > brick.x &&
          xPos < brick.x + brickWidth &&
          yPos > brick.y &&
          yPos < brick.y + brickHeight
        ) {
          yMoveDist = -yMoveDist;
          brick.hit = true;
          score++;
        }
      }
    }
  }

  if (allBricksCleared) {
    gameWin = true;
    gameOver = true;
    buttonVisible = true;
  }
}


// Game Logic

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameOver) {
    drawGameOver();
    return;
  }

  drawBall();
  drawPaddle();
  drawBricks();
  drawScore();

  updateBallPosition();
  updatePaddlePosition();
  checkBrickCollision();
}

function resetGame() {
  xPos = canvas.width / 2;
  yPos = canvas.height / 2;
  xMoveDist = 2;
  yMoveDist = 2;
  xPaddle = canvas.width / 2 - 50;
  score = 0;
  gameOver = false;
  gameWin = false;
  buttonVisible = false;

  // Reset bricks
  for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
      bricks[r][c].hit = false;
    }
  }
}

//Set up the loop using setInvterval **Slow or Speed Up Ball*
const refreshRate = 15;
const intervalId = setInterval(draw, refreshRate);

