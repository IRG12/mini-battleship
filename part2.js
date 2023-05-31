// const readlineSync = require("readline-sync");

// const GRID_SIZE = 10;
// const SHIP_LENGTHS = [5, 4, 3, 3, 2];
// const SHIP_SYMBOL = "X";
// const HIT_SYMBOL = "O";
// const MISS_SYMBOL = "M";
// const EMPTY_SYMBOL = "-";
// let totalShips = SHIP_LENGTHS.length;

// // Generate an empty grid
// let grid = [];
// function generateGrid() {
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
//       let intersect = false;
//       for (let j = 0; j < shipLocations.length; j++) {
//         let loc = shipLocations[j];
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
//   return shipLocations;
// }

// function displayGrid(grid) {
//   let column = "  ";
//   for (let i = 0; i < GRID_SIZE; i++) {
//     column += " " + String.fromCharCode(65 + i);
//   }
//   console.log(column);
//   for (let i = 0; i < GRID_SIZE; i++) {
//     let rowString = "" + (i + 1);
//     if (rowString.length < 2) {
//       rowString += " ";
//     }
//     for (let j = 0; j < GRID_SIZE; j++) {
//       if (grid[i][j] === 0) {
//         rowString += " " + EMPTY_SYMBOL;
//       } else if (grid[i][j] === -1) {
//         rowString += " " + MISS_SYMBOL;
//       } else if (grid[i][j] > 0) {
//         rowString += " " + SHIP_SYMBOL;
//       } else if (grid[i][j] === HIT_SYMBOL) {
//         rowString += " " + HIT_SYMBOL;
//       }
//     }
//     console.log(rowString);
//   }
// }

// let numShipsSunk = 0;

// const resetGame = () => {
//   numShipsSunk = 0;
//   grid = [];
//   shipLocations = [];
// };

// const playAgain = () => {
//   let playAgain = readlineSync.keyInYN(
//     'You have destroyed all battleships. Would you like to play again? Y/N"'
//   );
//   if (!playAgain) {
//     // Key that is not `Y` was pressed.
//     process.exit();
//   }
//   resetGame();
//   playGame();
// };

// function playGame() {
//   let grid = generateGrid();
//   let shipLocations = addShips(grid);
//   console.log("Welcome to Battleship!");
//   console.log("There are " + totalShips + " ships on the board.");
//   const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//   while (numShipsSunk < totalShips) {
//     displayGrid(grid);
//     // console.table(grid);
//     let guess = readlineSync.question("Enter your guess (e.g. A1): ");
//     let letter = guess.charAt(0).toUpperCase();
//     let col = letters.indexOf(letter);
//     let row = parseInt(guess.substring(1)) - 1;
//     console.log(col, "line 534");
//     // Check if the entered column is within the valid range
//     if (col < 0 || col >= GRID_SIZE) {
//       console.log("Invalid column. Please enter a valid column (1-10).");
//       continue; // Go back to the beginning of the while loop
//     }
//     console.log(console.log(grid[row][col], "line 540"));
//     if (grid[row][col] === 0) {
//       console.log("Miss!");
//       grid[row][col] = -1;
//     } else if (grid[row][col] > 0) {
//       console.log("Hit!");
//       console.log(grid[row][col], "line 545");
//       let ship = shipLocations.find(
//         (shipId) =>
//           // console.log(shipId, " line 531")
//           grid[row][col] === shipId.length
//       );
//       console.log(ship, "line 551");
//       // console.log(ship);

//       if (grid[row][col] === ship.length) {
//         console.log(ship === ship.length, "line 555");
//         ship.hits++;
//         if (ship.hits === ship.length) {
//           console.log(ship.hits);
//           shipLocations.splice(shipLocations.indexOf(ship), 1); // deletes object
//           numShipsSunk++;
//           console.log(`Sunk! ${totalShips - numShipsSunk} remaining`);
//           console.table(shipLocations);
//         }
//       }

//       grid[row][col] = HIT_SYMBOL;
//       console.table(shipLocations);
//     } else if (grid[row][col] === HIT_SYMBOL) {
//       console.log(grid[row][col]);
//       console.log("You already hit that spot!");
//     }
//   }
//   if (numShipsSunk === 5) {
//     playAgain();
//   }
//   // console.log("Congratulations, you sank all the ships!");
// }

// // Start the game
// playGame();

// // It's a battleship terminal game. 1) When I attack the tenth row, the code attacks the first row. 2) when the second ship with a length of three is sunk, the object is not uniquely tracking this and then updating numShipsSunk to player 3) Game ends when numShipsSunk count === 1. I don't want that. I want the game to end when numShipsSunk === 0
