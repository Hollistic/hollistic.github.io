
// Maze Game - Interactive Scene Project
// Umair Khan
// September 17th, 2021
//
// Extra for Experts:
// - created my own shapes using polygons
// - added music/sound effects
//
// Instructions:
// Use WASD to control your player try and get to the end of the level.
// Press the mouse to open the door.
// Have fun!



//Level Values
let level = 1; 
let startPositionX;
let startPositionY;
let winGame;

//Player Values
let playerX = 20; 
let playerY = 20; 
let playerW = 10; 
let playerH = 10; 
let speed = 1.5;

//Screen Border
const border = []; // stores the vertices of the screen border polygon

//walls
let wallPoly1 = []; // stores the vertices of the level walls polygon
let wallPoly2 = [];

//door
let door = [];
let doorOpen = false;

//Collison
let hit = false;
let hitDoor = false;
let touchEnd = false;

//music and sound effects
let musicLoop;
let playerExplodesSound;
let winGameSound;

//preload assets
function preload() {
  musicLoop = loadSound("assets/caveloop.wav");
  playerExplodesSound = loadSound("assets/explode.wav");
  winGameSound = loadSound("assets/win.wav");
}

//setup
function setup() {
  createCanvas(600, 400);
  winGame = false;

  //define the vertices of the canvas border
  border[0] = createVector(0,0);
  border[1] = createVector(width, 0);
  border[2] = createVector(width, height);
  border[3] = createVector(0, height);

  //start music loop
  musicLoop.loop();
}

//main draw loop
function draw() {
  background(170);
  
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

//checks which level we are on and sets an according start position for the player
function checkLevel() {
  if (level === 1) {
    startPositionX = 20; startPositionY = 20; 

    //makes rectangle in bottom right corner for winning the game
    push();
    noStroke();
    fill("limegreen");
    rect(width-50, height-50, 50, 50);
    pop();
  }
  
  //text appears when game is won
  if (winGame) {
    push();
    fill("limegreen");
    textSize(50);
    text("You Win!", 10, 40);
    pop();
  }
}

//draw the player on the screen
function drawPlayer(){
  rectMode(CORNER);
  stroke(0);
  fill("white");
  rect(playerX, playerY, playerW, playerH);
  
}

//draws the main walls of the level
function drawWalls(){
  if (level === 1){
    //define the vertices of the wall polygon 1
    wallPoly1[0] = createVector(0, 50);
    wallPoly1[1] = createVector(170, 50);
    wallPoly1[2] = createVector(300, 150);
    wallPoly1[3] = createVector(0, 200);

    //wallpoly2
    wallPoly2[0] = createVector(200, 0);
    wallPoly2[1] = createVector(width, 0);
    wallPoly2[2] = createVector(width, 116);
    wallPoly2[3] = createVector(355, 116);
    

    // Draw the polygon by iterating over 4 created vectors x/y stored in wall[]:
    push();
    fill(244, 144, 9);
    noStroke();

    //wallpoly1
    beginShape();
    for (let {x, y} of wallPoly1)  {
      vertex(x, y);
    }
    endShape(CLOSE);

    //wallpoly2
    beginShape();
    for (let {x, y} of wallPoly2)  {
      vertex(x, y);
    }
    endShape(CLOSE);
  
    //rectangle walls
    rect(0, 150, 560, 60);
    rect(25, 237, width, 80);
    rect(0, 335, 520, height);
    pop();

  }
}

//draws the door in the level
function drawDoor() {
  if (level === 1) {
    
    // define vertices of door polygon
    door[0] = createVector(250, 200); 
    door[1] = createVector(275, 200);
    door[2] = createVector(275, 250);
    door[3] = createVector(250, 250);

    //draw polygon if mouse isn't pressed otherwise don't draw it
    push();
    if (!mouseIsPressed){ 
      beginShape();
      fill("magenta");
      for (let {x, y} of door)  {
        vertex(x, y);
      }
      endShape(CLOSE);
      pop();
    }
  }
}


// checks for player collision with border, walls or door
function playerCollision() {
  // if the player x/y collides with these objects at their x/y positions the statement is set to true
  hit = collideRectPoly(playerX, playerY, playerW, playerH, border) || collideRectPoly(playerX, playerY, playerW, playerH, wallPoly1) || collideRectPoly(playerX, playerY, playerW, playerH, wallPoly2) || collideRectRect(playerX, playerY, playerW, playerH, 0, 150, 560, 60) || collideRectRect(playerX, playerY, playerW, playerH, 25, 237, width, 80) || collideRectRect(playerX, playerY, playerW, playerH, 0, 335, 520, height);
  hitDoor = collideRectPoly(playerX, playerY, playerW, playerH, door);
  winGame = collideRectRect(playerX, playerY, playerW, playerH, width-50, height-50, 50, 50);

  //if player hits a wall/ border return to start position
  if (hit){
    playerExplodesSound.play();
    playerX = startPositionX; playerY = startPositionY;
  }

  //checks if touching door
  if (hitDoor){
    if(!mouseIsPressed){
      for (let {x, y} of door){
        //the player keeps getting pushed back 25% of their speed in x or y directions if they try to touch the door
        let pushBack = speed * (25/100);

        if (playerY <= door[1].y) {
          playerY -= pushBack;
          console.log("hit from top");
        }

        else if (playerY >= door[2].y) {
          playerY += pushBack;
          console.log("hit from bottom");
        }

        else if (playerX <= door[0].x) {
          playerX -= pushBack;
          console.log("hit from left");
        }

        else if (playerX >= door[3].x) {
          playerX += pushBack;
          console.log("hit from right");
        }
      }
    }
  }
}