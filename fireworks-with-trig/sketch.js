// Fireworks Trig Demo
// Umair Khan
// 10/8/2021

let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");

  for (let i=fireworks.length-1; i>=0; i--) {
    if (fireworks[i].isDead()) {
      //remove from the array
      fireworks.splice(i, 1);
    }
    else {
      fireworks[i].update();
      fireworks[i].display();
    }
  }
}

function mousePressed() {
  angleMode(DEGREES);
  let numberOfFireworks = 100;
  for (let i=0; i<numberOfFireworks; i++) {
    let scalar = random(1, 3);
    let dx = cos(i*360/numberOfFireworks + random(-3, 3)) * scalar;
    let dy = sin(i*360/numberOfFireworks + random(-3, 3)) * scalar;
    let someParticle = new Particle(mouseX, mouseY, dx, dy);
    fireworks.push(someParticle);
  }
}

class Particle {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 255;
    this.color = color(255, 255, 0, this.alpha);
  }

  display() {
    noStroke();
    this.color = color(255, 255, 0, this.alpha);
    fill(this.color);
    circle(this.x, this.y, this.size);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    this.alpha-=2;
  }

  isDead() {
    return this.alpha <= 0;
  }

}
