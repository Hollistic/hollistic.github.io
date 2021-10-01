// Minesweeper Game
// Umair Khan
// 9/28/2021
//
// Extras for experts
//

let gridSize = 10;
let grid;
let cellSize;

function setup() {
  if (windowHeight < windowWidth) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  
  grid = createRandomArray(gridSize);

  cellSize = width / gridSize;
}

function draw() {
  background(220);

  displayGrid();
}

function mousePressed() {
  if(mouseX <= width && mouseY <= height){
    let cellX = Math.floor(mouseX/cellSize); 
    let cellY = Math.floor(mouseY/cellSize); 

    blankSpace(cellX, cellY);
  }
}

//clicked blank
function blankSpace(x, y) {
  if (x>=0 && x<gridSize && y>=0 && y<gridSize) {
    if (grid[y][x] === 0){
      grid[y][x] = 1;
    }
  }
}


function createRandomArray(howLarge) {
  let newArray = [];
  for (let y = 0; y < howLarge; y++) {
    newArray.push([]);
    for(let x = 0; x < howLarge; x++) {
      if (random(0, 100) > 10){
        newArray[y].push(0);
      }
      else {
        newArray[y].push("bomb");
      }
    }
  }
  return newArray;
}

function displayGrid() {
  for (let y=0; y < gridSize; y++) {
    for (let x=0; x < gridSize; x++) {
      //uncovered
      if (grid[y][x] === 0){
        fill("grey");
      }
      //revealed
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

