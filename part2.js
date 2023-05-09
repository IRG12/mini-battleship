const readlineSync = require("readline-sync");

const gridSize = 10;
const shipLengths = [5, 4, 3, 3, 2];
let grid = Array(gridSize)
  .fill()
  .map(() => Array(gridSize).fill(0));
let hits = 0;

function placeShips() {
  for (let i = 0; i < shipLengths.length; i++) {
    let shipLength = shipLengths[i];
    let direction = Math.floor(Math.random() * 2);
    let x, y;

    if (direction === 1) {
      // Place ship horizontally
      do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * (gridSize - shipLength + 1));
      } while (checkCollision(x, y, shipLength, direction));
      for (let j = 0; j < shipLength; j++) {
        grid[x][y + j] = shipLength;
      }
    } else {
      // Place ship vertically
      do {
        x = Math.floor(Math.random() * (gridSize - shipLength + 1));
        y = Math.floor(Math.random() * gridSize);
      } while (checkCollision(x, y, shipLength, direction));
      for (let j = 0; j < shipLength; j++) {
        grid[x + j][y] = shipLength;
      }
    }
  }
}

function checkCollision(x, y, shipLength, direction) {
  if (direction === 1) {
    // Check horizontal collision
    for (let i = y; i < y + shipLength; i++) {
      if (grid[x][i] !== 0) {
        return true;
      }
    }
  } else {
    // Check vertical collision
    for (let i = x; i < x + shipLength; i++) {
      if (grid[i][y] !== 0) {
        return true;
      }
    }
  }
  return false;
}

function processGuess(x, y) {
  if (grid[x][y] === 0) {
    console.log("You have missed!");
    grid[x][y] = -1;
  } else if (grid[x][y] > 1) {
    const shipLength = grid[x][y];
    grid[x][y] = -shipLength;
    hits++;
    console.log(`Hit! You hit a ship with length ${shipLength}.`);
    if (hits === shipLengths.reduce((acc, curr) => acc + curr, 0)) {
      console.log(`You sunk all the ships!`);
    }
  } else {
    console.log("You already guessed that location!");
  }
}

function play() {
  console.log("Welcome to Battleship!");
  placeShips();
  console.log(grid);

  while (hits < shipLengths.reduce((acc, curr) => acc + curr, 0)) {
    let x = readlineSync.questionInt("Enter a row number (0-9): ");
    let y = readlineSync.questionInt("Enter a column number (0-9): ");

    if (x < 0 || x > 9 || y < 0 || y > 9) {
      console.log("Invalid input. Please enter a number between 0 and 9.");
      continue;
    }

    processGuess(x, y);
  }

  console.log("Thanks for playing!");
}

play();
