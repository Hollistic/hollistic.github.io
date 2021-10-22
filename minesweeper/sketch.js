// Grid Base Game - Minesweeper
// Umair Khan
// 9/28/2021
//
// Extra for experts:
// -used oop with classes to create individual cell objects for each index value in the 2d array
// -implemented flood fill algorithm for adjacent cells when revealed
// -added sound effects, used image sprite for bombs and pushed into array
//
// Instructions: Click on the grid to reveal squares, numbers signify how many a bombs a cell is touching, try to clear the grid without clicking any bombs!

let gameLost = false;

let gridSize = 15;
let grid;
let cellSize;

let bombAmount = 0;

let bombSprite;
let boomSound;
let musicLoop;

//preload
function preload() {
  bombSprite = loadImage("assets/bomb.png");
  boomSound = loadSound("assets/vine-boom.mp3");
}

//on window resize run setup function
function windowResized() {
  setup();
}


function setup() {
 
  //creates largest square possible
  if (windowHeight < windowWidth) {
    createCanvas(windowHeight*0.9, windowHeight*0.9);
  }
  else {
    createCanvas(windowWidth*0.9, windowWidth*0.9);
  }
  

  //create new 2d array
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

  //audio volume
  boomSound.setVolume(0.1);
}

//main draw loop
function draw() {
  background(255);

  //displays the grid
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid[y][x].showCells();
    }
  }

  checkMousePress();

  //if the game is lost, reveal the board, if "r" pressed reset the board
  if (gameLost === true) {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++){
        grid[y][x].isRevealed = true;
        if (keyIsDown(82)) {
          boomSound.stop();
          setup();
          gameLost = false;
        }
      }
    }
    //displays the game over text on game lost
    fill("red");
    textAlign(CENTER);
    textSize(width/10);
    text("bruh", width/2, height/2);
    fill("yellow");
    textSize(width/30);
    text("Press R to play again!", width/2, height/1.8);
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
    this.neighbourColors = ["blue", "green", "red", "purple", "maroon", "turquoise", "black", "grey"];
  }
  
  //creates a random bomb in the grid 
  createBomb() {
    if (random(0, 100) > 85) {
      this.isBomb = true;
      bombAmount++;
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
      //bombs sprite revealed
      if (this.isBomb) {
        image(bombSprite, this.x, this.y, this.size, this.size);
      }
      else {
        //other revealed
        fill("lightgrey");
        rect(this.x, this.y, this.size, this.size);

        //text of neighbours
        if (this.neighbourAmount > 0) {
          fill(this.neighbourColors[this.neighbourAmount-1]);
          textAlign(CENTER);
          textSize(cellSize/2);
          text(this.neighbourAmount, this.x + this.size/2, this.y+ this.size/1.5);
        }
      }
    }
  }
  
  //sets the cell's value isRevealed to true, if the cell has no neighbours flood fill function is run
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

    // checks from a range of -1 to 1 adjacent cells of the cell to count the number of neighbours it shares
    for (let adjX = -1; adjX < 2; adjX++) {
      for (let adjY = -1; adjY < 2; adjY++){
        //the x/y is used to find the index value of the adjacent cells
        let x = this.x/this.size + adjX;
        let y = this.y/this.size + adjY;

        //sanity check
        if (x > -1 && x < gridSize && y > -1 && y < gridSize) {
          //counts bomb neighbours
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


// Will check for mouse presses on grid, (x,y) will be tested by mouseX, mouseY
function checkMousePress() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++){
          if (grid[y][x].mouseOnCell(mouseX, mouseY)) {
            grid[y][x].revealCells();
            //if mouse pressed on bomb game is lost
            if (grid[y][x].isBomb) {
              boomSound.play();
              gameLost = true;
            }
          }
        }
      }
    }
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