const readlineSync = require("readline-sync");

// Wait for user's response.
const startGame = () => {
  readlineSync.keyInPause("Press any key to start the game. ");
};
startGame();

const placeShipsRandomly = () => {
  // Define the dimensions of the array
  const rows = 3;
  const cols = 3;

  // Create an empty 2D array
  const grid = new Array(rows).fill(null).map(() => new Array(cols).fill(null));

  // Define an array of possible ship names
  const shipNames = ["Ship1", "Ship2"];

  // Define an array to store which ships have already been placed
  const shipsPlaced = [];

  // Loop through each ship name in the shipNames array
  for (let i = 0; i < shipNames.length; i++) {
    let placed = false;

    // Loop until the current ship has been successfully placed in the array
    while (!placed) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);

      // If the current location in the array is null, place the ship there
      if (grid[row][col] === null) {
        grid[row][col] = shipNames[i];
        shipsPlaced.push(shipNames[i]);
        placed = true;
      }
    }
  }
  return grid;
};
let board = placeShipsRandomly();
console.log(board);
const location = () => {
  return readlineSync.question(`Enter a location to strike i.e.: 'A2'. `);
};
let enteredLocation = location();

let offBoard = [];
let coordinatesAttacked = [];
console.log(coordinatesAttacked);
let shipsRemaining = 0;

const prevAttacks = () => {
  for (let coordinate of coordinatesAttacked) {
    coordinate;
  }
};
let prevCoordinates = scan();

const attack = (row, col) => {
  if (board[row][col] === null) {
    console.log("You have missed!");
    coordinatesAttacked.push(enteredLocation);
    location();
  } else {
    offBoard.push(board[row][col]);
    coordinatesAttacked.push(enteredLocation);
    shipsRemaining--;
    console.log(
      `Hit. You have sunk a battleship. ${shipsRemaining} ship remaining.`
    );
    location();
  }
};

const scanWaters = () => {
  switch (enteredLocation) {
    case "A1":
      attack(0, 0);
      break;
    case "A2":
      attack(0, 1);
      break;
    case "A3":
      attack(0, 2);
      break;
    case "B1":
      attack(1, 0);
      break;
    case "B2":
      attack(1, 1);
      break;
    case "B3":
      attack(1, 2);
      break;
    case "C1":
      attack(2, 0);
      break;
    case "C2":
      attack(2, 1);
      break;
    case "C3":
      attack(2, 2);
      break;
  }
};
scanWaters();

// if (offBoard.length <= 2) {
//   if (prevCoordinates === enteredLocation) {
//     console.log("You have already picked this location. Miss!");
//     location();
//   }
// }

// ------------

// if (offBoard.length === 2) {
//   let playAgain = !readlineSync.keyInYN(
//     'You have destroyed all battleships. Would you like to play again? Y/N"'
//   );
//   if (!playAgain) {
//     // Key that is not `Y` was pressed.
//     process.exit();
//   }
//   startGame();
// }
