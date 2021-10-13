// OOP Pair Programming Starter Code
// Umair K., Samin A.
// 10/13/2021


// ------------------------------------------------------------------------- //
// You don't need to edit this section...

let enterprise;
let shipImage, bulletImage;
let bulletArray = [];

function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width / 2, height / 2, 5, shipImage);
}

function windowResized() {
  setup();
}

function draw() {
  background(0);
  enterprise.update();
  enterprise.display();

  for (let i=0; i < bulletArray.length; i++) {
    bulletArray[i].display();
    bulletArray[i].update();
    if (bulletArray[i].isOffScreen()) {
      bulletArray.splice(i, 1);
    }
  }
}

function keyPressed() {
  enterprise.handleKeyBullet();
}



// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theSpeed, theImage) {
    // define the variables needed for this ship
    this.x = x;
    this.y = y;
    this.speed = theSpeed;
    this.img = theImage;
  }

  handleKeyBullet() {
    if (keyIsDown(32)) { //spacebar
      let newBullet = new Bullet(this.x+40, this.y-30, 5, bulletImage);
      bulletArray.push(newBullet);
    }
  }

  update() {
    // move ship
    if (keyIsDown(87)) { //w
      this.y -= this.speed;
    }
    if (keyIsDown(65)) { //a
      this.x -= this.speed;
    }
    if (keyIsDown(83)) { //s
      this.y += this.speed;
    }
    if (keyIsDown(68)) { //d
      this.x += this.speed;
    }
  }

  display() {
    // show the ship
    image(this.img, this.x, this.y);
  }

}

// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

class Bullet {
  constructor(x, y, dy, theImage) {
    // define the variables needed for the bullet here
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.img = theImage;
  }

  update() {
    // what does the bullet need to do during each frame? how do we know if it is off screen? 
    this.y -= this.dy;
  }

  display() {
    // show the bullet
    image(this.img, this.x, this.y);
  }

  isOffScreen() {
    // check if the bullet is still on the screen
    if (this.y < 0) {
      return true;
    }
  }
}

