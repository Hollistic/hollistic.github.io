// Grid Base Game - Minesweeper
// Umair Khan
// 9/28/2021
//
// To-Do
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

//setup
function setup() {
  //creates largest square possible
  if (windowHeight < windowWidth) {
    createCanvas(windowHeight*0.9, windowHeight*0.9);
  }
  else {
    createCanvas(windowWidth*0.9, windowWidth*0.9);
  }
  
  grid = createRandomArray(gridSize);

  cellSize = width / gridSize;
}

function windowResized() {
  setup();
}

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

//clicked uncovered square
function uncoveredSquareClicked(x, y) {
  if (x>=0 && x<gridSize && y>=0 && y<gridSize) {
    if (grid[y][x] === 10){
      grid[y][x] = 1;
    }
    if (grid[y][x] === "bomb") {
      gameLost = true;
    }
  }
}


function createRandomArray(howLarge) {
  let newArray = [];
  for (let y = 0; y < howLarge; y++) {
    newArray.push([]);
    for(let x = 0; x < howLarge; x++) {
      if (random(0, 100) > 30){
        newArray[y].push(10);
      }
      else {
        newArray[y].push("bomb");
      }
    }
  }
  return newArray;
}

function countAdjacentBomb() {

  //current cell [y][x]

  //north [y-1][x]

  //east [y][x+1]

  //south [y+1][x]

  //west [y][x-1]

  //north-east [y-1][x+1]

  //south-east [y+1][x+1]
  
  //north-west [y-1][x-1]

  //south-west [y+1][x-1]

}

function displayGrid() {
  for (let y=0; y < gridSize; y++) {
    for (let x=0; x < gridSize; x++) {
      //uncovered
      if (grid[y][x] === 10){
        fill("grey");
      }
      //empty
      else if (grid[y][x] === 1) {
        fill("white");
      }
      //bombs
      else if (grid[y][x] === "bomb") {
        fill("red"); 
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }

  }
}

