const readlineSync = require("readline-sync");

// const gridSize = 10;
// const shipLengths = [5, 4, 3, 3, 2];
// let grid = Array(gridSize)
//   .fill()
//   .map(() => Array(gridSize).fill(0));
// let hits = 0;
// let shipsSunk = 0;

// function placeShips() {
//   for (let i = 0; i < shipLengths.length; i++) {
//     let shipLength = shipLengths[i];
//     let direction = Math.floor(Math.random() * 2);
//     let x, y;

//     if (direction === 1) {
//       // Place ship horizontally
//       do {
//         x = Math.floor(Math.random() * gridSize);
//         y = Math.floor(Math.random() * (gridSize - shipLength + 1));
//       } while (checkCollision(x, y, shipLength, direction));
//       for (let j = 0; j < shipLength; j++) {
//         grid[x][y + j] = shipLength;
//       }
//     } else {
//       // Place ship vertically
//       do {
//         x = Math.floor(Math.random() * (gridSize - shipLength + 1));
//         y = Math.floor(Math.random() * gridSize);
//       } while (checkCollision(x, y, shipLength, direction));
//       for (let j = 0; j < shipLength; j++) {
//         grid[x + j][y] = shipLength;
//       }
//     }
//   }
// }

// function checkCollision(x, y, shipLength, direction) {
//   if (direction === 1) {
//     // Check horizontal collision
//     for (let i = y; i < y + shipLength; i++) {
//       if (grid[x][i] !== 0) {
//         return true;
//       }
//     }
//   } else {
//     // Check vertical collision
//     for (let i = x; i < x + shipLength; i++) {
//       if (grid[i][y] !== 0) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

// function processGuess(x, y) {
//   if (grid[x][y] === 0) {
//     console.log("You have missed!");
//     grid[x][y] = -1;
//   } else if (grid[x][y] > 1) {
//     const shipLength = grid[x][y];
//     grid[x][y] = -shipLength;
//     hits++;
//     console.log(`Hit! You hit a ship with length ${shipLength}.`);
//     if (hits === shipLengths.reduce((acc, curr) => acc + curr, 0)) {
//       console.log(`You sunk all the ships!`);
//     }
//     if (checkShipsSunk(shipLength)) {
//       console.log(`You sunk a ship with length ${shipLength}!`);
//       shipsSunk++;
//     }
//   } else {
//     console.log("You already guessed that location!");
//   }
// }

// function checkShipsSunk(shipLength) {
//   for (let i = 0; i < gridSize; i++) {
//     for (let j = 0; j < gridSize; j++) {
//       if (grid[i][j] === shipLength) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

// function play() {
//   console.log("Welcome to Battleship!");
//   placeShips();

//   let shipsSunk = 0;

//   while (hits < shipLengths.reduce((acc, curr) => acc + curr, 0)) {
//     console.log(
//       grid
//         .map((row) => row.map((val) => (val === 0 ? "-" : "X")).join(" "))
//         .join("\n")
//     );
//     let x = readlineSync.questionInt("Enter a row number (0-9): ");
//     let y = readlineSync.questionInt("Enter a column number (0-9): ");

//     if (x < 0 || x > 9 || y < 0 || y > 9) {
//       console.log("Invalid input. Please enter a number between 0 and 9.");
//       continue;
//     }

//     processGuess(x, y);

//     if (hits === shipLengths.reduce((acc, curr) => acc + curr, 0)) {
//       console.log(`You sunk all the ships!`);
//       break;
//     }

//     // Check if a ship has been sunk
//     for (let i = 0; i < gridSize; i++) {
//       for (let j = 0; j < gridSize; j++) {
//         if (grid[i][j] < 0) {
//           let shipLength = Math.abs(grid[i][j]);
//           let shipSunk = true;
//           for (let k = 0; k < shipLength; k++) {
//             if (grid[i][j + k] > 0 || grid[i + k][j] > 0) {
//               shipSunk = false;
//               break;
//             }
//           }
//           if (shipSunk) {
//             shipsSunk++;
//             console.log(`You sunk a ship with length ${shipLength}!`);
//           }
//         }
//       }
//     }
//   }

//   console.log("Thanks for playing!");

//   // Ask if the player wants to play again
//   let playAgain = readlineSync.keyInYN("Do you want to play again?");
//   if (playAgain) {
//     // Reset the game
//     grid = Array(gridSize)
//       .fill()
//       .map(() => Array(gridSize).fill(0));
//     hits = 0;
//     play();
//   } else {
//     console.log("Goodbye!");
//   }
// }
// play();const readline = require('readline-sync');

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
