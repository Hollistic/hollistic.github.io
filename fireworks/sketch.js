// Fireworks Demo
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
  for (let i=0; i<100; i++) {
    let someParticle = new Particle(mouseX, mouseY);
    fireworks.push(someParticle);
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
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
