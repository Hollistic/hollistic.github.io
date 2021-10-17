// Grid Base Game - Minesweeper
// Umair Khan
// 9/28/2021
//
// Extra for experts:
// -used oop with classes to create individual cell objects for each index in the 2d array
// -implemented flood fill algorithm
// -added sound effects
// -created a main menu

let gameLost = false;

let gridSize = 15;
let grid;
let cellSize;

let bombSprite;
let bombAmount = 15;

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
  cellSize = floor(width / gridSize);

  //initiate each position in grid to become a cell object
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid[y][x] = new Cell(y*cellSize, x*cellSize, cellSize);
      grid[y][x].createBomb();
    } 
  }

  //check adjacent cells in the grid (neighbours)
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid[y][x].checkAdjacentCells();
    } 
  }

  
}

//on window resize
function windowResized() {
  setup();
}

//main draw loop
function draw() {
  background(255);

  // displayGrid();
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++){
      grid[y][x].showCells();
    }
  }

  checkMousePress();

  if (gameLost === true) {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++){
        grid[y][x].isRevealed = true;
      }
    }
    fill("red");
    textAlign(CENTER);
    textSize(100);
    text("boom", width/2, height/2);
  }
}

// Will check for mouse presses on grid, (x,y) will be tested by mouseX, mouseY

function checkMousePress() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++){
          if (grid[y][x].mouseOnCell(mouseX, mouseY)) {
            grid[y][x].revealCells();
            if (grid[y][x].isBomb) {
              gameLost = true;
            }
          }
        }
      }
    }
  }
}

class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isRevealed = false;
    this.isBomb = false;
    this.neighbourAmount = 0;
    this.neighbourColors = ["blue", "green", "red", "purple", "maroon", "cyan", "black", "grey"];
  }
  
  //creates a random bomb in the grid 
  createBomb() {
    if (random(0, 100) > 85) {
      this.isBomb = true;
      bombAmount--;
    }
    else {
      this.isBomb = false;
    }
  }

  //displays cells in the grid
  showCells() {
    noFill();
    stroke(0);
    rect(this.x, this.y, this.size, this.size);
    
    if (this.isRevealed) {
      //bombs sprite
      if (this.isBomb) {
        image(bombSprite, this.x, this.y, this.size, this.size);
      }
      else {
        fill("lightgrey");
        rect(this.x, this.y, this.size, this.size);
        //text of neighbours
        if (this.neighbourAmount > 0) {
          fill(this.neighbourColors[this.neighbourAmount-1]);
          textAlign(CENTER);
          textSize(30);
          text(this.neighbourAmount, this.x + this.size/2, this.y+ this.size/1.5);
        }
      }
    }
  }
  
  revealCells() {
    this.isRevealed = true;
    if (this.neighbourAmount === 0) {
      this.floodFillAlgorithm();
    }
  }

  //checks adjacent cells and their states
  checkAdjacentCells() {
    let neighbourCounter = 0;
    
    if (this.isBomb) {
      return this.neighbourAmount = -1;
    }

    // checks from a range of -1 to 1 adjacent cells of the grid[y][x] to count the number of neighbours it shares
    for (let adjX = -1; adjX < 2; adjX++) {
      for (let adjY = -1; adjY < 2; adjY++){
        //the following is used to find the index value of the adjacent cells of [y][x]
        let x = this.x/this.size + adjX;
        let y = this.y/this.size + adjY;

        //sanity check
        if (x > -1 && x < gridSize && y > -1 && y < gridSize) {
          //counts neighbours
          let adjacentCell = grid[x][y];
          if(adjacentCell.isBomb) {
            neighbourCounter++;
          }
        }
      }
    }
    //"returns" the amount of neighbours of the individual cell
    this.neighbourAmount = neighbourCounter;
  }

  floodFillAlgorithm() { //similar to checkAdjacentCells();
    for (let adjX = -1; adjX < 2; adjX++) {
      for (let adjY = -1; adjY < 2; adjY++){
        //the following is used to find the index value of the adjacent cells of [y][x]
        let x = this.x/this.size + adjX;
        let y = this.y/this.size + adjY;

        //sanity check
        if (x > -1 && x < gridSize && y > -1 && y < gridSize) {
          let adjacentCell = grid[x][y];
          //if the adjacent cell isn't revealed and isn't a bomb, reveal the cell
          if (!adjacentCell.isRevealed && !adjacentCell.isBomb) {
            adjacentCell.revealCells();
          }
        }
      }
    }
  }

  //checks if mouse is hovering on the boundaries of a cell
  mouseOnCell(x, y) {
    return x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size;
  }

}

//creates a new 2d array 
function createArray(howLarge) {
  let newArray = [];
  for (let y = 0; y < howLarge; y++) {
    newArray.push([]);
  }
  return newArray;
}