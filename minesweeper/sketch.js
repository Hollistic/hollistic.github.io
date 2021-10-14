// Grid Base Game - Minesweeper
// Umair Khan
// 9/28/2021
//
// To-Do/wants
// -random bomb location grid and another playing grid with blanks on top of that
// -number indications adjacent to bombs in NESW
// -flood fill algorithm when pressing blank space, clear all adjacent blank spaces
// -game lost when mine pressed
// -mine flagging
// -different levels of difficulties
// -polishing by adding music, sprites, menu, etc

let gridSize = 10;
let grid;
let cellSize;
let gameLost = false;

let bombSprite;

//preload
function preload() {
  bombSprite = loadImage("assets/bomb.png");
}

//setup
function setup() {
  //creates largest square possible
  if (windowHeight < windowWidth) {
    createCanvas(windowHeight*0.9, windowHeight*0.9);
  }
  else {
    createCanvas(windowWidth*0.9, windowWidth*0.9);
  }
  
  grid = createArray(gridSize);

  cellSize = width / gridSize;

}

//on window resize
function windowResized() {
  setup();
}

//main draw loop
function draw() {
  background(220);

  displayGrid();
}


function mousePressed() {
  if(mouseX <= width && mouseY <= height){
    let cellX = Math.floor(mouseX/cellSize); 
    let cellY = Math.floor(mouseY/cellSize); 

    uncoveredSquareClicked(cellX, cellY);
  }
}

class Cell {
  constructor() {
    
    this.isRevealed = false;
    this.isBomb = false;
  }

  checkBomb() {

  }

  floodFill() {

  }
}

//clicked uncovered square
function uncoveredSquareClicked(x, y) {
  if (x>=0 && x<gridSize && y>=0 && y<gridSize) {
    if (grid[y][x] === 10){
      grid[y][x] = 1;
    }
    if (grid[y][x] === "*") {
      gameLost = true;
    }
  }
}


function createArray(howLarge) {
  let newArray = [];
  for (let y = 0; y < howLarge; y++) {
    newArray.push([]);
    for(let x = 0; x < howLarge; x++) {
      if (random(0, 100) > 30){
        newArray[y].push(0);
      }
      else {
        newArray[y].push("*");
      }
    }
  }
  return newArray;
}

function countAdjacentBomb() {

  for (let y=0; y<gridSize; y++) {
    for (let x=0; x<gridSize; x++) {
      // current cell [y][x]
      if (grid[y][x] === "*") {
        //sanity checks are created for each individual adjacent square to check if it's outside of the array or a bomb
        if (y-1 > 0 && y-1 !== "*") {
          grid[y-1][x] += 1; //north [y-1][x]
        }
        if (x+1 < gridSize[y] && x+1 !== "*") {
          grid[y][x+1] += 1; //east [y][x+1]
        }
        if (y+1 < gridSize && y+1 !== "*") {        
          grid[y+1][x] += 1; //south [y+1][x]
        }
        if (x-1 > 0 && x-1 !== "*") {
          grid[y][x-1] += 1; //west [y][x-1]
        }
        if (y-1 > 0 && x+1 < gridSize[y] && y-1 !== "*" && x+1 !== "*") {
          grid[y-1][x+1] += 1; //north-east [y-1][x+1]
        }
        if (y+1 < gridSize && x+1 < gridSize[y] && y+1 !== "*" && x+1 !== "*") {
          grid[y+1][x+1] += 1; //south-east [y+1][x+1]
        }
        if (y-1 > 0 && x-1 > 0 && y-1 !== "*" && x-1 !== "*") {
          grid[y-1][x-1] += 1; //north-west [y-1][x-1]
        }
        if (y+1 < gridSize && x-1 > 0 && y+1 !== "*" && x-1 !== "*") {
          grid[y+1][x-1] += 1; //south-west [y+1][x-1]
        }
      }
    }
  }
}

// function drawNumbers() {
//   for (let y=0; y<gridSize; y++) {
//     for (let x=0; x<gridSize; x++) {
//       fill("black");
//     }
//   }
// }

function displayGrid() {
  for (let y=0; y < gridSize; y++) {
    for (let x=0; x < gridSize; x++) {
      //empty
      if (grid[y][x] === 0) { 
        fill("white");
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
      }
      //bombs
      else if (grid[y][x] === "*") {
        image(bombSprite, x*cellSize, y*cellSize, cellSize, cellSize);
      }

      else {
        rect(x*cellSize, y*cellSize, cellSize, cellSize);
      }
    
    }

  }
}

