// Conway's Game of Life
// Umair Khan
// 9/29/2021

let gridSize = 15;
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

function keyPressed() {
  if (key === "e") {
    grid = createEmptyArray(gridSize);
  }
  if (key === "r") {
    grid = createRandomArray(gridSize);
  }
  if (key === " ") {
    update();
  }
}

function update() {
  //need another array so you don't mess up the decisions you're making
  let nextTurn = createEmptyArray(gridSize);

  for (let y = 0; y<gridSize; y++) {
    for (let x = 0; x<gridSize; x++) {
      let neighbours = 0;
      
      //look at the cells in a 3x3 grid next to current cell
      for (let i = -1; i<=1; i++) {
        for (let j = -1; j<=1; j++) {
          if  (y+i >= 0 && x+j >= 0 && y+i < gridSize && x+j < gridSize) {
            neighbours += grid[y+i][x+j];
          }
        }
      }

      //fix adding self
      neighbours -= grid[y][x];

      //applying rules
      if (grid[y][x] === 0) { //dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 1) { //alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  grid = nextTurn;
}

function mousePressed() {
  if(mouseX <= width && mouseY <= height){
    let cellX = Math.floor(mouseX/cellSize); 
    let cellY = Math.floor(mouseY/cellSize); 

    swap(cellX, cellY);
  }
}

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
      if (random(0, 100) > 50){
        newArray[y].push(0);
      }
      else {
        newArray[y].push(1);
      }
    }
  }
  return newArray;
}


function createEmptyArray(howLarge) {
  let newArray = [];
  for (let y = 0; y < howLarge; y++) {
    newArray.push([]);
    for(let x = 0; x < howLarge; x++) {
      newArray[y].push(0);
    }
  }
  return newArray;
}

function displayGrid() {
  for (let y=0; y < gridSize; y++) {
    for (let x=0; x < gridSize; x++) {
      if (grid[y][x] === 0){
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black"); 
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

