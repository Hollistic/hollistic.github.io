// Character Grid Movement
// Umair Khan
// 10/1/2021

let gridSize = 10;
let grid;
let cellSize;
let level1;
let playerX = 0;
let playerY = 0;

function preload() {
  level1 = loadJSON("assets/level1.json");
}

function setup() {
  if (windowHeight < windowWidth) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  
  // grid = createRandomArray(gridSize);
  grid = level1;
  cellSize = width / gridSize;

  //place player
  grid[playerY][playerX] = 9;
}

function draw() {
  background(220);

  displayGrid();
}

//key pressed
function keyPressed() {
  if (key === "s") {
    tryMoving(playerX, playerY+1);
  }
  else if (key === "w") {
    tryMoving(playerX, playerY-1);
  }
  else if (key === "a") {
    tryMoving(playerX-1, playerY);
  }
  else if (key === "d") {
    tryMoving(playerX+1, playerY);
  }
}

function mousePressed() {
  //draw walls
  if(mouseX <= width && mouseY <= height){
    let cellX = Math.floor(mouseX/cellSize); 
    let cellY = Math.floor(mouseY/cellSize); 
    swap(cellX, cellY);
  }
}

function tryMoving(newX, newY) {
  //make sure you're on the grid (not outside)
  if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
    //check if new spot is empty
    if (grid[newY][newX] === 0) {
      //reset current spot to be empty
      grid[playerY][playerX] = 0;

      //move player
      playerX = newX; playerY = newY;
      
      //put player back in grid in new spot
      grid[newY][newX] = 9;
    }
  }
}

//swaps between wall/empty space
function swap(x, y) {
  if (x>=0 && x<gridSize && y>=0 && y<gridSize) {
    if (grid[y][x] === 0){
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1){
      grid[y][x] = 0;
    }
  }

}

function createRandomArray(howLarge) {
  let newArray = [];
  for (let y = 0; y < howLarge; y++) {
    newArray.push([]);
    for(let x = 0; x < howLarge; x++) {
      newArray[y].push(0);
    }
  }
  return newArray;
}

//displays the grid
function displayGrid() {
  for (let y=0; y < gridSize; y++) {
    for (let x=0; x < gridSize; x++) {
      if (grid[y][x] === 0){
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black"); 
      }
      else if (grid[y][x] === 9) {
        fill("red"); 
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

