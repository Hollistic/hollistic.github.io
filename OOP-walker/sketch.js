// OOP Walker
// Umair Khan 
// 10/6/2021

let person;
let athiela;
let chase;

function setup() {
  createCanvas(windowWidth, windowHeight);
  person = new Walker(width/2, height/2, "blue");
  athiela = new Walker(300, 200, "red");
  chase = new Walker(600, 600, "green");
}

function draw() {
  // background(220);
  person.display();
  person.move();

  athiela.display();
  athiela.move();

  chase.display();
  chase.move();
}

class Walker {
  constructor(x, y, theColor) {
    this.x = x;
    this.y = y;
    this.radius = 1;
    this.speed = 5;
    this.color = theColor;
  }

  display() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move() {
    let theChoice = random(100);

    if (theChoice < 25) { //up
      this.y -= this.speed;
    }
    else if (theChoice < 50) { //down
      this.y += this.speed;
    }
    else if (theChoice < 75) { //right
      this.x += this.speed;
    }
    else { //left
      this.x -= this.speed;
    }
  }
}