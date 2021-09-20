
// Maze Game - Interactive Scene Project
// Umair Khan
// September 17th, 2021
//
// Extra for Experts:
// - created my own shapes using polygons
// - added sound effects


//Level Values
let level = 1; 
let startPositionX; 
let startPositionY;

//Player Values
let playerX = 1; 
let playerY = 1; 
let playerW = 10; 
let playerH = 10; 
let speed = 2;

//Collison
let hit = false;

//Screen Border
const border = []; // stores the vertices of the screen border polygon

//Polygon
let wall = []; // stores the vertices of the level walls polygon


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

//keyboard controls for player
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

function checkLevel() {
  if (level === "1") {
    startPositionX = 20; startPositionY = 20; 
  }
}

function drawPlayer(){
  rectMode(CORNER);
  stroke(0);
  fill("white");
  rect(playerX, playerY, playerW, playerH);
  
}

function drawWalls(){
  
  //define the vertices of the canvas border polygon
  border[0] = createVector(0,0);
  border[1] = createVector(width, 0);
  border[2] = createVector(width, height);
  border[3] = createVector(0, height);
  
  //define the vertices of the wall polygon
  wall[0] = createVector(1, 50); 
  wall[1] = createVector(200, 50);
  wall[2] = createVector(200, 80);
  wall[3] = createVector(1, 80);


  
  // Draw the polygon by iterating over 4 created vectors x/y stored in wall[]:
  beginShape();
  fill(244, 144, 9);
  noStroke();
  for (let {x, y} of wall)  {
    vertex(x, y);
  }
  endShape(CLOSE);
  
}

function playerCollision(){
  // hit is true if player touches the wall or screen border polygon
  hit = collideRectPoly(playerX, playerY, playerW, playerH, wall) || collideRectPoly(playerX, playerY, playerW, playerH, border);
  
  if (hit){
    playerX = startPositionX; playerY = startPositionY;
  }
  

}