// const readlineSync = require("readline-sync");

// const placeShipsRandomly = () => {
//   // Define the dimensions of the array
//   const rows = 10;
//   const cols = 10;

//   // Create an empty 2D array
//   const grid = new Array(rows).fill(null).map(() => new Array(cols).fill(null));

//   // Define an array of possible ship names

//   // Define an array to store which ships have already been placed
//   const shipsPlaced = [];
//   const shipNames = ["Ship1", "Ship2", "Ship3", "Ship4", "Ship5"];
//   let ship1 = 2;
//   let ship2 = 3;
//   let ship3 = 3;
//   let ship4 = 4;
//   let ship5 = 5;

//   // Loop through each ship name in the shipNames array
//   for (let i = 0; i < shipNames.length; i++) {
//     let placed = false;

//     // Loop until the current ship has been successfully placed in the array
//     while (!placed) {
//       const row = Math.floor(Math.random() * rows);
//       const col = Math.floor(Math.random() * cols);

//       // If the current location in the array is null, place the ship there
//       if (grid[row][col] === null) {
//         grid[row][col] = shipNames[i];
//         shipsPlaced.push(shipNames[i]);
//         placed = true;
//       }
//     }
//   }
//   return grid;
// };

// const startGame = () => {
//   readlineSync.keyInPause("Press any key to start the game. ");
// };

// startGame();
// let board = placeShipsRandomly();
// console.log(board);

const boardSize = 10; // size of the game board
const shipLengths = [5, 4, 3, 3, 2]; // lengths of the ships to be placed
const board = []; // the game board

// initialize the board with all 0's
for (let i = 0; i < boardSize; i++) {
  board[i] = [];
  for (let j = 0; j < boardSize; j++) {
    board[i][j] = 0;
  }
}

// function to place ships on the board
function placeShips() {
  for (let i = 0; i < shipLengths.length; i++) {
    let shipLength = shipLengths[i];
    let shipPlaced = false;

    // keep trying to place the ship until it is placed successfully
    while (!shipPlaced) {
      let direction = Math.floor(Math.random() * 2); // 0 for horizontal, 1 for vertical
      let x, y;

      if (direction === 0) {
        // place the ship horizontally
        x = Math.floor(Math.random() * (boardSize - shipLength + 1));
        y = Math.floor(Math.random() * boardSize);

        // check if the ship intersects with any other ship
        let intersect = false;
        for (let j = 0; j < shipLength; j++) {
          if (board[x + j][y] === 1) {
            intersect = true;
            break;
          }
        }

        // if the ship does not intersect, place it on the board
        if (!intersect) {
          for (let j = 0; j < shipLength; j++) {
            board[x + j][y] = 1;
          }
          shipPlaced = true;
        }
      } else {
        // place the ship vertically
        x = Math.floor(Math.random() * boardSize);
        y = Math.floor(Math.random() * (boardSize - shipLength + 1));

        // check if the ship intersects with any other ship
        let intersect = false;
        for (let j = 0; j < shipLength; j++) {
          if (board[x][y + j] === 1) {
            intersect = true;
            break;
          }
        }

        // if the ship does not intersect, place it on the board
        if (!intersect) {
          for (let j = 0; j < shipLength; j++) {
            board[x][y + j] = 1;
          }
          shipPlaced = true;
        }
      }
    }
  }
}

// call the function to place the ships on the board
placeShips();

// print the board to the console
console.log(board);
