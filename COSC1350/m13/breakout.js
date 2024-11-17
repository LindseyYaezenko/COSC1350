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
const paddleY = canvas.height - 15; // Positioned near the bottom of the canvas
let moveLeft = false;
let moveRight = false;

// Ball properties
const ballRadius = 15;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;
let xMoveDist = 3;
let yMoveDist = 3;


// Event Listeners
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.key === "ArrowLeft") moveLeft = true;
  if (event.key === "ArrowRight") moveRight = true;
});

document.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.key === "ArrowLeft") moveLeft = false;
  if (event.key === "ArrowRight") moveRight = false;
});


// Functions

// Render the ball on the canvas.
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

// Render the paddle on the canvas. 
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(xPaddle, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "black"; // Black paddle
  ctx.fill();
  ctx.closePath();
}


// Movement and Collision Functions
function updateBallPosition() {
  xPos += xMoveDist;
  yPos += yMoveDist;
  if (xPos + ballRadius > canvas.width || xPos - ballRadius < 0) {
    xMoveDist = -xMoveDist;
  }
  if (yPos - ballRadius < 0) {
    yMoveDist = -yMoveDist;
  }
  if (yPos + ballRadius > canvas.height) {
    yMoveDist = -yMoveDist; 
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

//draw 
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  drawBall(); // Render the ball
  drawPaddle(); // Render the paddle

  updateBallPosition(); // Move the ball and handle collisions
  updatePaddlePosition(); // Move the paddle if a key is pressed
}

// Set up the loop using setInterval
const refreshRate = 10; // The interval for each frame in milliseconds
const intervalID = setInterval (draw, refreshRate); 

