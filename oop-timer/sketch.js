// OOP timer
// Umair Khan
// 10/12/2021

let fiveSeconds;
let time;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fiveSeconds = new Timer(3000);
}

function draw() {
  background(220);

  if (fiveSeconds.isDone()) {
    background("red");
  }
  else {
    background("black");
  }
}

function mousePressed() {
  fiveSeconds.reset();
}

class Timer {
  constructor(duration) {
    this.duration = duration;
    this.start = millis();
  }

  isDone() {
    return millis() > this.duration + this.start;
  }

  reset() {
    this.start = millis();
  }

  setDuration(duration) {
    this.duration = duration;
  }
}
