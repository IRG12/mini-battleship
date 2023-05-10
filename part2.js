const readlineSync = require("readline-sync");

const GRID_SIZE = 10;
const SHIP_LENGTHS = [5, 4, 3, 3, 2];
const SHIP_SYMBOL = "X";
const HIT_SYMBOL = "O";
const MISS_SYMBOL = "-";

// Generate an empty grid
function generateGrid() {
  let grid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    let row = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
}

function addShips(grid) {
  let shipLocations = [];
  for (let i = 0; i < SHIP_LENGTHS.length; i++) {
    let shipLength = SHIP_LENGTHS[i];
    let orientation = Math.floor(Math.random() * 2);
    let validLocation = false;
    let row, col;
    while (!validLocation) {
      if (orientation === 0) {
        // horizontal orientation
        row = Math.floor(Math.random() * GRID_SIZE);
        col = Math.floor(Math.random() * (GRID_SIZE - shipLength + 1));
        validLocation = true;
        for (let j = 0; j < shipLength; j++) {
          if (grid[row][col + j] !== 0) {
            validLocation = false;
            break;
          }
        }
      } else {
        // vertical orientation
        row = Math.floor(Math.random() * (GRID_SIZE - shipLength + 1));
        col = Math.floor(Math.random() * GRID_SIZE);
        validLocation = true;
        for (let j = 0; j < shipLength; j++) {
          if (grid[row + j][col] !== 0) {
            validLocation = false;
            break;
          }
        }
      }
      // Check if the new ship location intersects with any of the existing ships
      for (let j = 0; j < shipLocations.length; j++) {
        let loc = shipLocations[j];
        let intersect = false;
        if (orientation === 0) {
          // horizontal orientation
          if (
            row === loc.row &&
            col <= loc.col + loc.length - 1 &&
            col + shipLength - 1 >= loc.col
          ) {
            intersect = true;
          }
        } else {
          // vertical orientation
          if (
            col === loc.col &&
            row <= loc.row + loc.length - 1 &&
            row + shipLength - 1 >= loc.row
          ) {
            intersect = true;
          }
        }
        if (intersect) {
          validLocation = false;
          break;
        }
      }
    }
    shipLocations.push({
      row: row,
      col: col,
      length: shipLength,
      orientation: orientation,
    });
    if (orientation === 0) {
      // horizontal orientation
      for (let j = 0; j < shipLength; j++) {
        grid[row][col + j] = shipLength;
      }
    } else {
      // vertical orientation
      for (let j = 0; j < shipLength; j++) {
        grid[row + j][col] = shipLength;
      }
    }
  }
}

// Print the grid
function printGrid(grid, showShips) {
  let headerRow = "  ";
  for (let i = 1; i <= GRID_SIZE; i++) {
    headerRow += i + " ";
  }
  console.log(headerRow);
  for (let i = 0; i < GRID_SIZE; i++) {
    let row = String.fromCharCode(i + 65) + " ";
    for (let j = 0; j < GRID_SIZE; j++) {
      if (!showShips && grid[i][j] > 0) {
        row += "S ";
      } else if (grid[i][j] === 0) {
        row += MISS_SYMBOL + " ";
      } else if (grid[i][j] < SHIP_LENGTHS[0]) {
        row += SHIP_SYMBOL + " ";
      } else {
        row += HIT_SYMBOL + " ";
      }
    }
    console.log(row);
  }
}

// Play the game
function playGame() {
  console.log("Welcome to Battleship!");
  let grid = generateGrid();
  addShips(grid);
  let numShipsSunk = 0;
  while (numShipsSunk < SHIP_LENGTHS.length) {
    console.log(`Ships remaining: ${SHIP_LENGTHS.length - numShipsSunk}`);
    printGrid(grid, false);
    let guess = readlineSync.question("Enter your guess (e.g. B4): ");
    let row = guess.charCodeAt(0) - 65;
    let col = parseInt(guess.substring(1)) - 1;
    if (grid[row][col] === 0) {
      console.log("Miss!");
      grid[row][col] = -1;
    } else if (grid[row][col] < 0) {
      console.log("You already guessed that location.");
    } else {
      console.log("Hit!");
      let shipLength = grid[row][col];
      grid[row][col] *= -1;
      let shipSunk = true;
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (grid[i][j] === shipLength) {
            shipSunk = false;
            break;
          }
        }
        if (!shipSunk) {
          break;
        }
      }
      if (shipSunk) {
        console.log(`You sunk a ship of length ${shipLength}!`);
        numShipsSunk++;
      }
    }
  }
  console.log("Game over!");
  printGrid(grid, true);
}

// Play the game
playGame();
