// OOP Button
// Umair Khan
// 10/12/2021

let button1;
let button2;
let backgroundColor = "white";

function setup() {
  createCanvas(windowWidth, windowHeight);

  button1 = new Button(300, height/2, 150, 100, "orange");
  button2 = new Button (600, height/2, 150, 100, "yellow");
  button2.hoverColor = "pink";
}

function draw() {
  background(backgroundColor);

  button1.display();
  button2.display();
}

function mousePressed() {
  if (button1.checkHover(mouseX, mouseY)) {
    backgroundColor = "red";
  }
  else if (button2.checkHover(mouseX, mouseY)) {
    backgroundColor = "black";
  }
}

class Button {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.buttonColor = color;
    this.hoverColor = "limegreen";
  }

  display() {
    if (this.checkHover(mouseX, mouseY)) {
      fill(this.hoverColor);
    }
    else {
      fill(this.buttonColor);
    }
    rect(this.x, this.y, this.width, this.height);
  }

  checkHover(x, y) {
    return x >= this.x && x <= this.x+this.width && y >= this.y && y <= this.y+this.height;
  }

}