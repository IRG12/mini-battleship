// const readlineSync = require("readline-sync");

// const GRID_SIZE = 10;
// const SHIP_LENGTHS = [5, 4, 3, 3, 2];
// const SHIP_SYMBOL = "X";
// const HIT_SYMBOL = "O";
// const MISS_SYMBOL = "-";

// // Generate an empty grid
// function generateGrid() {
//   let grid = [];
//   for (let i = 0; i < GRID_SIZE; i++) {
//     let row = [];
//     for (let j = 0; j < GRID_SIZE; j++) {
//       row.push(0);
//     }
//     grid.push(row);
//   }
//   return grid;
// }

// function addShips(grid) {
//   let shipLocations = [];
//   for (let i = 0; i < SHIP_LENGTHS.length; i++) {
//     let shipLength = SHIP_LENGTHS[i];
//     let orientation = Math.floor(Math.random() * 2);
//     let validLocation = false;
//     let row, col;
//     while (!validLocation) {
//       if (orientation === 0) {
//         // horizontal orientation
//         row = Math.floor(Math.random() * GRID_SIZE);
//         col = Math.floor(Math.random() * (GRID_SIZE - shipLength + 1));
//         validLocation = true;
//         for (let j = 0; j < shipLength; j++) {
//           if (grid[row][col + j] !== 0) {
//             validLocation = false;
//             break;
//           }
//         }
//       } else {
//         // vertical orientation
//         row = Math.floor(Math.random() * (GRID_SIZE - shipLength + 1));
//         col = Math.floor(Math.random() * GRID_SIZE);
//         validLocation = true;
//         for (let j = 0; j < shipLength; j++) {
//           if (grid[row + j][col] !== 0) {
//             validLocation = false;
//             break;
//           }
//         }
//       }
//       // Check if the new ship location intersects with any of the existing ships
//       for (let j = 0; j < shipLocations.length; j++) {
//         let loc = shipLocations[j];
//         let intersect = false;
//         if (orientation === 0) {
//           // horizontal orientation
//           if (
//             row === loc.row &&
//             col <= loc.col + loc.length - 1 &&
//             col + shipLength - 1 >= loc.col
//           ) {
//             intersect = true;
//           }
//         } else {
//           // vertical orientation
//           if (
//             col === loc.col &&
//             row <= loc.row + loc.length - 1 &&
//             row + shipLength - 1 >= loc.row
//           ) {
//             intersect = true;
//           }
//         }
//         if (intersect) {
//           validLocation = false;
//           break;
//         }
//       }
//     }
//     shipLocations.push({
//       row: row,
//       col: col,
//       length: shipLength,
//       orientation: orientation,
//     });
//     if (orientation === 0) {
//       // horizontal orientation
//       for (let j = 0; j < shipLength; j++) {
//         grid[row][col + j] = shipLength;
//       }
//     } else {
//       // vertical orientation
//       for (let j = 0; j < shipLength; j++) {
//         grid[row + j][col] = shipLength;
//       }
//     }
//   }
// }

// // Print the grid
// function printGrid(grid, showShips) {
//   let headerRow = "  ";
//   for (let i = 1; i <= GRID_SIZE; i++) {
//     headerRow += i + " ";
//   }
//   console.log(headerRow);
//   for (let i = 0; i < GRID_SIZE; i++) {
//     let row = String.fromCharCode(i + 65) + " ";
//     for (let j = 0; j < GRID_SIZE; j++) {
//       if (!showShips && grid[i][j] > 0) {
//         row += "S ";
//       } else if (grid[i][j] === 0) {
//         row += MISS_SYMBOL + " ";
//       } else if (grid[i][j] < SHIP_LENGTHS[0]) {
//         row += HIT_SYMBOL + " ";
//       } else {
//         row += SHIP_SYMBOL + " ";
//       }
//     }
//     console.log(row);
//   }
// }

// const ships = {
//   5: { hits: 0 },
//   4: { hits: 0 },
//   3: { hits: 0 },
//   3: { hits: 0 },
//   2: { hits: 0 },
// };

// // Function to handle a hit on a ship
// let numShipsSunk = 0;
// function handleHit(shipName) {
//   const ship = ships[shipName];
//   ship.hits++;
//   if (ship.hits === shipName) {
//     console.log(`You sank the ${shipName}!`);
//     numShipsSunk++;
//     const numShipsRemaining = Object.keys(ships).length - numShipsSunk;
//     console.log(`Ships remaining: ${numShipsRemaining}`);
//   } else {
//     console.log(`Hit!`);
//   }
// }

// // Play the game
// function playGame() {
//   console.log("Welcome to Battleship!");
//   let grid = generateGrid();
//   addShips(grid);
//   while (numShipsSunk < SHIP_LENGTHS.length) {
//     console.log(`Ships remaining: ${SHIP_LENGTHS.length - numShipsSunk}`);
//     printGrid(grid, false);
//     let guess = readlineSync.question("Enter your guess (e.g. B4): ");
//     let row = guess.charCodeAt(0) - 65;
//     let col = parseInt(guess.substring(1)) - 1;
//     if (grid[row][col] === 0) {
//       console.log("Miss!");
//       grid[row][col] = -1;
//     } else if (grid[row][col] < 0) {
//       console.log("You already guessed that location.");
//     } else {
//       for (let i = 0; i < GRID_SIZE; i++) {
//         for (let j = 0; j < GRID_SIZE; j++) {
//           grid[i][j] *= -1;
//           handleHit(grid[i][j]);
//         }
//       }
//     }
//   }
//   console.log("Game over!");
//   printGrid(grid, true);
// }

// // Play the game
// playGame();

// const readlineSync = require("readline-sync");

// const GRID_SIZE = 10;
// const SHIP_LENGTHS = [5, 4, 3, 3, 2];
// const SHIP_SYMBOL = "X";
// const HIT_SYMBOL = "O";
// const MISS_SYMBOL = "-";

// // Generate an empty grid
// function generateGrid() {
//   let grid = [];
//   for (let i = 0; i < GRID_SIZE; i++) {
//     let row = [];
//     for (let j = 0; j < GRID_SIZE; j++) {
//       row.push(0);
//     }
//     grid.push(row);
//   }
//   return grid;
// }

// let shipLocations = [];
// function addShips(grid) {
//   for (let i = 0; i < SHIP_LENGTHS.length; i++) {
//     let shipLength = SHIP_LENGTHS[i];
//     let orientation = Math.floor(Math.random() * 2);
//     let validLocation = false;
//     let row, col;
//     while (!validLocation) {
//       if (orientation === 0) {
//         // horizontal orientation
//         row = Math.floor(Math.random() * GRID_SIZE);
//         col = Math.floor(Math.random() * (GRID_SIZE - shipLength + 1));
//         validLocation = true;
//         for (let j = 0; j < shipLength; j++) {
//           if (grid[row][col + j] !== 0) {
//             validLocation = false;
//             break;
//           }
//         }
//       } else {
//         // vertical orientation
//         row = Math.floor(Math.random() * (GRID_SIZE - shipLength + 1));
//         col = Math.floor(Math.random() * GRID_SIZE);
//         validLocation = true;
//         for (let j = 0; j < shipLength; j++) {
//           if (grid[row + j][col] !== 0) {
//             validLocation = false;
//             break;
//           }
//         }
//       }
//       // Check if the new ship location intersects with any of the existing ships
//       for (let j = 0; j < shipLocations.length; j++) {
//         let loc = shipLocations[j];
//         let intersect = false;
//         if (orientation === 0) {
//           // horizontal orientation
//           if (
//             row === loc.row &&
//             col <= loc.col + loc.length - 1 &&
//             col + shipLength - 1 >= loc.col
//           ) {
//             intersect = true;
//           }
//         } else {
//           // vertical orientation
//           if (
//             col === loc.col &&
//             row <= loc.row + loc.length - 1 &&
//             row + shipLength - 1 >= loc.row
//           ) {
//             intersect = true;
//           }
//         }
//         if (intersect) {
//           validLocation = false;
//           break;
//         }
//       }
//     }
//     shipLocations.push({
//       row: row,
//       col: col,
//       length: shipLength,
//       orientation: orientation,
//       hits: 0,
//     });
//     if (orientation === 0) {
//       // horizontal orientation
//       for (let j = 0; j < shipLength; j++) {
//         grid[row][col + j] = shipLength;
//       }
//     } else {
//       // vertical orientation
//       for (let j = 0; j < shipLength; j++) {
//         grid[row + j][col] = shipLength;
//       }
//     }
//   }
// }

// // // Print the grid
// // function printGrid(grid, showShips) {
// //   let headerRow = "  ";
// //   for (let i = 1; i <= GRID_SIZE; i++) {
// //     headerRow += `${i}`;
// //   }
// //   console.log(headerRow);
// //   for (let i = 0; i < GRID_SIZE; i++) {
// //     let rowStr = `${String.fromCharCode(i + 65)}`;
// //     for (let j = 0; j < GRID_SIZE; j++) {
// //       let cell = grid[i][j];
// //       if (showShips && cell !== 0) {
// //         rowStr += `${SHIP_SYMBOL}`;
// //       } else if (cell === -1) {
// //         rowStr += `${MISS_SYMBOL}`;
// //       } else if (cell > 0) {
// //         rowStr += `${HIT_SYMBOL}`;
// //       } else {
// //         rowStr += `${" - "}`;
// //       }
// //     }
// //     console.log(rowStr);
// //   }
// // }

// // Print the grid
// function printGrid(grid, showShips) {
//   let headerRow = "  ";
//   for (let i = 1; i <= GRID_SIZE; i++) {
//     headerRow += i + " ";
//   }
//   console.log(headerRow);
//   for (let i = 0; i < GRID_SIZE; i++) {
//     let row = String.fromCharCode(i + 65) + " ";
//     for (let j = 0; j < GRID_SIZE; j++) {
//       if (!showShips && grid[i][j] > 0) {
//         row += "S ";
//       } else if (grid[i][j] === 0) {
//         row += MISS_SYMBOL + " ";
//       } else if (grid[i][j] < SHIP_LENGTHS[0]) {
//         row += HIT_SYMBOL + " ";
//       } else {
//         row += SHIP_SYMBOL + " ";
//       }
//     }
//     console.log(row);
//   }
// }

// // Main game function
// function playGame() {
//   console.log("Welcome to Battleship!");
//   let grid = generateGrid();
//   addShips(grid);
//   let shipsRemaining = SHIP_LENGTHS.length;
//   let gameOver = false;
//   let numGuesses = 0;
//   while (!gameOver) {
//     printGrid(grid, false);
//     let guess = readlineSync.question("Enter your guess (e.g. A1): ");
//     let row = guess.charCodeAt(0) - 65;
//     let col = parseInt(guess.substring(1)) - 1;
//     if (grid[row][col] === 0) {
//       grid[row][col] = -1; // mark as a miss
//       console.log("Miss!");
//     } else if (grid[row][col] > 0) {
//       let shipIndex = grid[row][col] - 1;
//       let ship = shipLocations[shipIndex];
//       ship.hits += 1;
//       if (ship.hits === ship.length) {
//         console.log(`You sank a ship of length ${ship.length}!`);
//         shipsRemaining -= 1;
//         if (shipsRemaining === 0) {
//           console.log("Congratulations, you won!");
//           gameOver = true;
//         }
//       } else {
//         console.log("Hit!");
//       }
//       grid[row][col] = grid[row][col] * -1; // mark as a hit
//     }
//     numGuesses += 1;
//   }
//   console.log(`Number of guesses: ${numGuesses}`);
// }

// // Call the main game function
// playGame();

const readlineSync = require("readline-sync");

const GRID_SIZE = 10;
const SHIP_LENGTHS = [5, 4, 3, 3, 2];
const SHIP_SYMBOL = "X";
const HIT_SYMBOL = "O";
const MISS_SYMBOL = "-";
let totalShips = SHIP_LENGTHS.length;

// Generate an empty grid
let grid = [];
function generateGrid() {
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
      let intersect = false;
      for (let j = 0; j < shipLocations.length; j++) {
        let loc = shipLocations[j];
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
      id: SHIP_LENGTHS[i],
      row: row,
      col: col,
      length: shipLength,
      orientation: orientation,
      hits: 0,
      sunk: false,
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
  return shipLocations;
}

function displayGrid(grid) {
  let headerRow = "  ";
  for (let i = 0; i < GRID_SIZE; i++) {
    headerRow += " " + String.fromCharCode(65 + i);
  }
  console.log(headerRow);
  for (let i = 0; i < GRID_SIZE; i++) {
    let rowString = "" + (i + 1);
    if (rowString.length < 2) {
      rowString += " ";
    }
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === 0) {
        rowString += " " + MISS_SYMBOL;
      } else if (grid[i][j] > 0 && grid[i][j] < 6) {
        rowString += " " + SHIP_SYMBOL;
      } else if (grid[i][j] === 6) {
        rowString += " " + HIT_SYMBOL;
      }
    }
    console.log(rowString);
  }
}

let numShipsSunk = 0;
const playAgain = () => {
  let playAgain = readlineSync.keyInYN(
    'You have destroyed all battleships. Would you like to play again? Y/N"'
  );
  if (!playAgain) {
    // Key that is not `Y` was pressed.
    process.exit();
  }
  playGame();
};

function playGame() {
  let grid = generateGrid();
  let shipLocations = addShips(grid);
  console.log("Welcome to Battleship!");
  console.log("There are " + totalShips + " ships on the board.");
  while (numShipsSunk < totalShips) {
    displayGrid(grid);
    // console.table(grid);
    let guess = readlineSync.question("Enter your guess (e.g. A1): ");
    let row = guess[1] - 1;
    let col = guess.charCodeAt(0) - 65;
    if (grid[row][col] === 0) {
      console.log("Miss!");
      grid[row][col] = 6;
    } else if (grid[row][col] > 0 && grid[row][col] < 6) {
      console.log("Hit!");
      console.log(grid[row][col], "line 530");
      let lengthOfThree = shipLocations.find(
        (shipId) =>
          // console.log(shipId, " line 531")
          grid[row][col] === shipId.length
      );
      console.log(lengthOfThree, "line 535");
      for (let ship of shipLocations) {
        // console.log(ship);

        if (ship.id === grid[row][col]) {
          console.log(lengthOfThree === ship.id, "line 540");
          ship.hits++;
        }
        if (ship.hits === ship.id) {
          console.log(ship.hits);
          console.log(`Sunk! ${totalShips - numShipsSunk} remaining`);
          ship.sunk = true;
          numShipsSunk++;
        }
      }

      grid[row][col] = 6;
      console.table(shipLocations);
    } else if (grid[row][col] === 6) {
      console.log(grid[row][col]);
      console.log("You already hit that spot!");
    }
  }
  if (numShipsSunk === 5) {
    playAgain();
  }
  // console.log("Congratulations, you sank all the ships!");
}

// Start the game
playGame();

// It's a battleship terminal game. 1) When I attack the tenth row, the code attacks the first row. 2) when the second ship with a length of three is sunk, the object is not uniquely tracking this and then updating numShipsSunk to player 3) Game ends when numShipsSunk count === 1. I don't want that. I want the game to end when numShipsSunk === 0
