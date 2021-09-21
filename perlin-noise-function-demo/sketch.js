// Perlin Noise Function Demo
// Umair Khan
// 9/21/2021

let x, y, radius, xTime, yTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  radius = random(25, 40);
  xTime = 0;
  yTime = 100;
}

function draw() {
  background(220);

  x = noise(xTime) * width;
  y = noise(yTime) * height;
  circle(x, y, radius*2);

  xTime += 0.01;
  yTime += 0.01;
}
