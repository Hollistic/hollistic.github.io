// OOP Ball
// Umair Khan 
// 10/7/2021

// let myBall;
let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let myBall = new Ball(width/2, height/2);
  ballArray.push(myBall);
}

function windowResized() {
  setup();
}

function draw() {
  background("black");
  for (let i=0; i<ballArray.length; i++) {
    for (let j=0; j<ballArray.length; j++) {
      if (i !== j) { //don't check if hitting self
        ballArray[i].checkCollision(ballArray[j]);
      }
    }

    ballArray[i].display();
    ballArray[i].move();
  }
}

function mousePressed() {
  let myBall = new Ball(mouseX, mouseY);
  ballArray.push(myBall);
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(15, 40);
    this.color = color(random(255), random(255), random(255), random(255));
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius*2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    //if touches wall
    if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
      this.dx *= -1;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
      this.dy *= -1;
    }
  }

  checkCollision(otherBall) {
    let distanceBetween = dist(this.x, this.y, otherBall.x, otherBall.y);
    let radiiSum = this.radius + otherBall.radius;
  
    //collided between balls
    if (distanceBetween < radiiSum) {
      this.color = "red";
      otherBall.color = "red";
    }

    //crappy collision resolution
    let tempDx = this.dx;
    let tempDy = this.dy;
    
    this.dx = otherBall.dx;
    this.dy = otherBall.dy;

    otherBall.dx = tempDx;
    otherBall.dy = tempDy;
  }
}
