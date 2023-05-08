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

const boardSize = 10;
const shipLengths = [5, 4, 3, 3, 2];
const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
// console.log(board)

function placeShips() {
  shipLengths.forEach((shipLength) => {
    let shipPlaced = false;
    while (!shipPlaced) {
      const direction = Math.floor(Math.random() * 2);
      // console.log((boardSize - shipLength + 1))
      const [x, y] = [
        direction === 0
          ? Math.floor(Math.random() * (boardSize - shipLength + 1))
          : Math.floor(Math.random() * boardSize),
        direction === 1
          ? Math.floor(Math.random() * (boardSize - shipLength + 1))
          : Math.floor(Math.random() * boardSize),
      ];
      // console.log([x,y])
      const intersect = Array.from({ length: shipLength }, (_, j) =>
        direction === 0 ? board[x + j][y] : board[x][y + j]
      ).some((val) => val === 1);
      console.log(intersect);
      if (!intersect) {
        Array.from({ length: shipLength }, (_, j) =>
          direction === 0 ? (board[x + j][y] = 1) : (board[x][y + j] = 1)
        );
        shipPlaced = true;
      }
    }
  });
}

placeShips();
// console.log(board);
