// Sudoku
// Umair Khan
// 10/4/2021

let initialGrid;

let gridSize = 9;
let cellSize;
let grid;

function preload() {
  initialGrid = loadStrings("assets/puzzle-1.txt");
}

function setup() {
  if (windowWidth < windowHeight){
    createCanvas(windowWidth*0.8, windowWidth*0.8);
  }
  else {
    createCanvas(windowHeight*0.8, windowHeight*0.8);
  }

  initialGrid = convertedGrid(initialGrid);

  grid = initialGrid;
  cellSize = width/gridSize;
}

function convertedGrid(initialGrid) {
  //assume rectangular array
  let rows = initialGrid.length;
  let cols = initialGrid[0].length;

  let newGrid = [];
  for (let y=0; y<rows; y++) {
    newGrid.push([]);
    for (let x=0; x<cols; x++) {
      newGrid[y].push(int(initialGrid[y][x]));
    }
  }
  return newGrid;
}

function draw() {
  background(220);

  displayGrid();
  displayLines();
}

function windowResized() {
  setup();
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