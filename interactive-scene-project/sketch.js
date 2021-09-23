
// Maze Game - Interactive Scene Project
// Umair Khan
// September 17th, 2021
//
// Extra for Experts:
// - created my own shapes using polygons
// - added sound effects

//to-do: Need to fix collision for bottom of door, add mouse for door add music, and create full level.

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
let moving = true;

//Collison
let hit = false;

//door
let door = [];
let hitDoor = false;
let doorOpen = false;

//Screen Border
const border = []; // stores the vertices of the screen border polygon

//Polygon
let wall = []; // stores the vertices of the level walls polygon

//music
let music;


function preload() {
  music = loadSound("assets/gigakoops-level-1-fire-mountain.mp3");
}



function setup() {
  createCanvas(600, 400);

  //define the vertices of the canvas border
  border[0] = createVector(0,0);
  border[1] = createVector(width, 0);
  border[2] = createVector(width, height);
  border[3] = createVector(0, height);

  //start music loop
  music.loop();
}

//main draw loop
function draw() {
  background(220);
  
  checkLevel();
  findLocation();
  drawWalls();
  drawDoor();
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
  if (moving){
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
}

function checkLevel() {
  if (level === 1) {
    startPositionX = 20; startPositionY = 20; 
  }
}

//draw the player on the screen
function drawPlayer(){
  rectMode(CORNER);
  stroke(0);
  fill("white");
  rect(playerX, playerY, playerW, playerH);
  
}

function drawWalls(){
  
  //define the vertices of the wall polygon
  wall[0] = createVector(1, 50);
  wall[1] = createVector(170, 50);
  wall[2] = createVector(130, 130);
  wall[3] = createVector(1, 80);

  
  // Draw the polygon by iterating over 4 created vectors x/y stored in wall[]:
  push();
  beginShape();
  fill(244, 144, 9);
  noStroke();
  for (let {x, y} of wall)  {
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();

}

function drawDoor() {
  door[0] = createVector(200, 50); 
  door[1] = createVector(250, 50);
  door[2] = createVector(250, 100);
  door[3] = createVector(200, 100);

  push();
  beginShape();
  fill("grey");
  for (let {x, y} of door)  {
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
  


}

function playerCollision() {
  // hit is true if player touches the wall or screen border polygon
  hit = collideRectPoly(playerX, playerY, playerW, playerH, wall) || collideRectPoly(playerX, playerY, playerW, playerH, border);
  hitDoor = collideRectPoly(playerX, playerY, playerW, playerH, door);

  //if player hits a wall or border return to start position
  if (hit){
    playerX = startPositionX; playerY = startPositionY;
  }

  //checks if touching door
  if (hitDoor){
    for (let {x, y} of door){
      if (playerY <= door[1].y) {
        playerY -= 0.5;
        console.log("hit from top");
      }
      
      else if (playerY >= door[2].y) {
        playerY += 0.5;
        console.log("hit from bottom");
      }

      else if (playerX <= door[0].x) {
        playerX -= 0.5;
        console.log("hit from left");
      }

      else if (playerX >= door[3].x) {
        playerX += 0.5;
        console.log("hit from right");
      }
    }
  }
}