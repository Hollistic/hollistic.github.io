// Ball Scene Demo
// Umair Khan
// September 20th, 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 1; i++) {
    spawnBall();
  }
  
  //spawn ball every 1/2 second
  window.setInterval(spawnBall, 500);
}

//main draw function
function draw() {
  background(220);
  
  checkBallTouchingMouse();
  moveBall();
  displayBall(); 
}

//on mouse press
function mousePressed() {
  spawnBall();

  ballArray[ballArray.length-1].x = mouseX;
  ballArray[ballArray.length-1].y = mouseY; 
}

function checkBallTouchingMouse() {
  for (let i=ballArray.length-1; i >= 0 ; i--) {
    let howFarAway = dist(ballArray[i].x, ballArray[i].y, mouseX, mouseY);
    if (howFarAway < ballArray[i].radius) {
      ballArray.splice(i, 1);
    }
  }
}
function spawnBall() {
  let ball = {
    x: random(width),
    y: random(height),
    dx: random(3, 5),
    dy: random(3, 5),
    radius:  random(10, 30),
    ballColor: color(random(255), random(255), random(255), random(255)),
    xTime: random(0, 1000),
    yTime: random(0, 1000),
    timeChange: random(0.001, 0.01),
  };
  ballArray.push(ball);
}

function moveBall() {
  for (let theBall of ballArray) {
    theBall.x = noise(theBall.xTime) * width;
    theBall.y = noise(theBall.yTime) * height;

    theBall.xTime += theBall.timeChange;
    theBall.yTime += theBall.timeChange;

    // theBall.x += theBall.dx;
    // theBall.y += theBall.dy;
    // theBall.dx = random(-7, 7);
    // theBall.dy = random(-7, 7);
  }
}


function displayBall() {
  for (let theBall of ballArray) {
    noStroke();
    fill(theBall.ballColor);
    ellipse(theBall.x, theBall.y, theBall.radius*2);
  }
}

