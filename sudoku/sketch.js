// Sudoku
// Umair Khan
// 10/4/2021

let initialGrid = [
  [0, 0, 7, 8, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 8, 4, 0],
  [8, 0, 9, 1, 0, 0, 6, 7, 0],
  [0, 6, 0, 7, 0, 0, 0, 0, 4],
  [4, 7, 5, 0, 9, 0, 1, 6, 3],
  [2, 0, 0, 0, 0, 4, 0, 8, 0],
  [0, 8, 1, 0, 0, 5, 3, 0, 9],
  [0, 2, 4, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 7, 4, 0, 0],
];

let gridSize = 9;
let cellSize;
let grid;

function setup() {
  if (windowWidth < windowHeight){
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  grid = initialGrid;
  cellSize = width/gridSize;
}

function draw() {
  background(220);

  displayGrid();
  displayLines();
}

function displayGrid() {
  for (let  y=0; y < gridSize; y++) {
    for (let x=0; x < gridSize; x++) {
      //grid
      fill("white");
      strokeWeight(1);
      rect(cellSize*x, cellSize*y, cellSize, cellSize);
      
      //number
      fill("black");
      if (grid[y][x] !== 0) {
        textSize(cellSize*0.5);
        textAlign(CENTER, CENTER);
        text(grid[y][x], cellSize*x + cellSize/2, cellSize*y + cellSize/2);
      }
      

    }
  }
}

function displayLines() {
  for (let i=0; i <= 9; i+= 3) {
    strokeWeight(5);
    //horizontal
    line(0, cellSize*i, width, cellSize*i);
    //vertical
    line(cellSize*i, 0, cellSize*i, width);
  }
}