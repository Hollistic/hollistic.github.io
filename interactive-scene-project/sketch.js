// Maze Game - Interactive Scene Pro
// Umair Khan
// 



//Player Values
let playerY = 25;
let playerX = 25;
let playerW = 10;
let playerH = 10;
let speed = 2;



//Collison
let touchHazard = false;
let touchBorder = false;

//Screen Border
const border = []; // stores the vertices of the screen border polygon

//Polygon
const wall = []; // stores the vertices of the level walls polygon


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  
  findLocation();
  drawWalls();
  drawPlayer();
  wasd();
  playerCollision();
  
}

// prints in console x/y of where mouse is pressed on canvas
function findLocation(){
  if (mouseIsPressed){
    console.log(mouseX, mouseY);
  }
}

//keyboardcontrols for player
function wasd() {
  //w
  if (keyIsDown(87)) {
    playerY -= speed;
  }
  //a
  if (keyIsDown(65)) {
    playerX -= speed;
  } 
  //s
  if (keyIsDown(83)) {
    playerY += speed;
  } 
  //d
  if (keyIsDown(68)) {
    playerX += speed;
  }
}

function drawPlayer(){
  rectMode(CORNER);
  stroke(0);
  fill("white")
  rect(playerX, playerY, playerW, playerH);
  
}

function drawWalls(){
  
  //screen border vertices
  border[0] = createVector(0,0);
  border[1] = createVector(width,0);
  border[2] = createVector(width, height);
  border[3] = createVector(0, height);
  
  //define the vertices of the hazards polygon
  wall[0] = createVector(1, 50);
  wall[1] = createVector(200, 50);
  wall[2] = createVector(200, 80);
  wall[3] = createVector(50, 30);
  
  // Draw the polygon by iterating over 4 created vectors x/y stored in poly[]:
  beginShape();
  fill(244, 144, 9);
  noStroke();
  for (const {x, y} of wall)  vertex(x, y);
  endShape(CLOSE);
  
}

function playerCollision(){
  hit = collideRectPoly(playerX, playerY, playerW, playerH, wall) || collideRectPoly(playerX, playerY, playerW, playerH, border);
  
  if (hit){
    playerX = 20; playerY = 20;
  }
  
  // if(hit ? playerY = 10: playerX);
  // if(hit ? playerX = 10: playerY);
  
  // if (playerX >= width - playerW){
  //   playerX = 0;
  // }
  // else if (playerX <= 0 + playerW){
  //   playerX = width;
  // }
  // else if (playerY <= 0- playerH){
  //   playerY = height;
  // }
  // else if (playerY >= height + playerH){
  //   playerY = 0;
  // }
  
}