// Ball Scene Demo
// Umair Khan
// September 20th, 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 1000; i++) {
    let ball = {
      x: random(width),
      y: random(height),
      dx: random(3, 5),
      dy: random(3, 5),
      radius:  random(10, 30),
      ballColor: color(random(255), random(255), random(255), random(255)),
    };
    ballArray.push(ball);
  }
}

function draw() {
  background(220);
  
  moveBall();
  displayBall(); 
}

function moveBall() {
  for (let theBall of ballArray) {
    theBall.x += theBall.dx;
    theBall.y += theBall.dy;
    theBall.dx = random(-7, 7);
    theBall.dy = random(-7, 7);
  }
}


function displayBall() {
  for (let theBall of ballArray) {
    noStroke();
    fill(theBall.ballColor);
    ellipse(theBall.x, theBall.y, theBall.radius*2);
  }
}


