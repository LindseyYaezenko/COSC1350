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
let xPaddle = canvas.width / 2 - 50; // Center the paddle initially
const paddleWidth = 100;
const paddleHeight = 15;
const paddleY = canvas.height - paddleHeight;
let moveLeft = false;
let moveRight = false;

// Ball properties
const ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;
let xMoveDist = 3;
let yMoveDist = 3;

// Brick properties
const brickRows = 4;
const brickColumns = 6;
const brickWidth = 90;
const brickHeight = 25;
const brickPadding = 10;
const brickTopOffset = 40;
const brickLeftOffset = 5;

// Brick Array
const bricks = [];
for (let r = 0; r < brickRows; r++) {
  bricks[r] = [];
  for (let c = 0; c < brickColumns; c++) {
    const brickX = brickLeftOffset + c * (brickWidth + brickPadding);
    const brickY = brickTopOffset + r * (brickHeight + brickPadding);
    bricks[r][c] = { x: brickX, y: brickY, hit: false };
  }
}

let gameOver = false; // game status


// Event Listeners
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveLeft = true;
  if (event.key === "ArrowRight") moveRight = true;
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") moveLeft = false;
  if (event.key === "ArrowRight") moveRight = false;
});

// Functions

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

// Render the bricks
function drawBricks() {
  for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
      const brick = bricks[r][c];
      if (!brick.hit) {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brickWidth, brickHeight);

        // brick colors
        const shades = ["#d3d3d3", "#a9a9a9", "#808080", "#696969"]; // Lightest to darkest
        ctx.fillStyle = shades[r]; 
        ctx.strokeStyle = "black"; // Black border

        ctx.fill();
        ctx.lineWidth = 2; 
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

// Handle ball collision with bricks
function checkBrickCollision() {
  for (let r = 0; r < brickRows; r++) {
    for (let c = 0; c < brickColumns; c++) {
      const brick = bricks[r][c];
      if (!brick.hit) {
        if (
          xPos > brick.x &&
          xPos < brick.x + brickWidth &&
          yPos > brick.y &&
          yPos < brick.y + brickHeight
        ) {
          yMoveDist = -yMoveDist; // Reverse ball direction
          brick.hit = true; // Mark brick as hit
        }
      }
    }
  }
}

// Update the ball's position and handle wall collisions
function updateBallPosition() {
  xPos += xMoveDist;
  yPos += yMoveDist;

  // Bounce off left and right walls
  if (xPos + ballRadius > canvas.width || xPos - ballRadius < 0) {
    xMoveDist = -xMoveDist;
  }

  // Bounce off top wall
  if (yPos - ballRadius < 0) {
    yMoveDist = -yMoveDist;
  }

  // Paddle collision detection
  if (
    yPos + ballRadius > paddleY &&
    xPos > xPaddle &&
    xPos < xPaddle + paddleWidth
  ) {
    yMoveDist = -yMoveDist; // Reverse direction
  }

  // Game over logic
  if (yPos + ballRadius > canvas.height) {
    gameOver = true; // Set game over status
  }
}

// Update paddle position based on key pressed
function updatePaddlePosition() {
  if (moveLeft && xPaddle > 0) {
    xPaddle -= 3; // Move paddle left
  }
  if (moveRight && xPaddle < canvas.width - paddleWidth) {
    xPaddle += 3; // Move paddle right
  }
}

// Display "Game Over" text
function displayGameOver() {
  ctx.font = "48px Lucida Handwriting";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

// Main Draw Loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  if (gameOver) {
    displayGameOver(); // Show "Game Over" text
    return; // Stop the game loop
  }

  drawBall(); // Render the ball
  drawPaddle(); // Render the paddle
  drawBricks(); // Render the bricks

  checkBrickCollision(); // Handle ball-brick collisions
  updateBallPosition(); // Move the ball and handle collisions
  updatePaddlePosition(); // Move the paddle if a key is pressed
}

// Set up the loop using setInterval **Slow or Speed Up Ball*
const refreshRate = 35; // The interval for each frame in milliseconds
const intervalID = setInterval (draw, refreshRate); 

