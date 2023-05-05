const readlineSync = require("readline-sync");

const placeShipsRandomly = () => {
  // Define the dimensions of the array
  const rows = 3;
  const cols = 3;

  // Create an empty 2D array
  const grid = new Array(rows).fill(null).map(() => new Array(cols).fill(null));

  // Define an array of possible ship names

  // Define an array to store which ships have already been placed
  const shipsPlaced = [];
  const shipNames = ["Ship1", "Ship2"];

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

const playAgain = () => {
  let playAgain = readlineSync.keyInYN(
    'You have destroyed all battleships. Would you like to play again? Y/N"'
  );
  if (!playAgain) {
    // Key that is not `Y` was pressed.
    process.exit();
  }
  board = placeShipsRandomly();
  // console.log(board);

  coordinatesAttacked = [];
  shipsRemaining = 2;
  startGame();
};

let board = placeShipsRandomly();
// console.log(board);
let coordinatesAttacked = [];
let shipsRemaining = 2;

// Wait for user's response.
const startGame = () => {
  readlineSync.keyInPause("Press any key to start the game. ");
  const continueGame = () => {
    const location = () => {
      console.log(board, "line 63");
      return readlineSync.question(`Enter a location to strike i.e.: 'A2'. `);
    };
    let enteredLocation = location();

    const positionsAttacked = () => {
      if (coordinatesAttacked.includes(enteredLocation)) {
        console.log("You have already picked this location. Miss!");
        enteredLocation = location(); // update enteredLocation with new input
        scanWaters(); // positionsAttacks() is called to check if the location has already been attacked.
      } else {
        console.log("You have missed! line 74");
        coordinatesAttacked.push(enteredLocation);
        enteredLocation = location(); // update enteredLocation with new input
        scanWaters();
      }
    };

    const attack = (row, col) => {
      if (board[row][col] === "Ship1" || board[row][col] === "Ship2") {
        coordinatesAttacked.push(enteredLocation);
        console.log(coordinatesAttacked, "line 84");
        shipsRemaining--;
        console.log(
          `Hit. You have sunk a battleship. ${shipsRemaining} ship remaining.`
        );
        if (shipsRemaining === 0) {
          playAgain();
        } else {
          enteredLocation = location();
          scanWaters(); // scanWaters() is called to continue attack
          // console.log(board);
        }
      } else if (board[row][col] === null) {
        positionsAttacked();
      }
    };

    // console.log(verify, "'verify' line 92");

    const scanWaters = () => {
      // console.log(board, "line 89");
      switch (enteredLocation) {
        case "A1":
          if (coordinatesAttacked.includes(enteredLocation)) {
            positionsAttacked();
          } else {
            attack(0, 0);
          }
          break;
        case "A2":
          if (coordinatesAttacked.includes(enteredLocation)) {
            positionsAttacked();
          } else {
            attack(0, 1);
          }
          break;
        case "A3":
          if (coordinatesAttacked.includes(enteredLocation)) {
            positionsAttacked();
          } else {
            attack(0, 2);
          }
          break;
        case "B1":
          if (coordinatesAttacked.includes(enteredLocation)) {
            positionsAttacked();
          } else {
            attack(1, 0);
          }
          break;
        case "B2":
          if (coordinatesAttacked.includes(enteredLocation)) {
            positionsAttacked();
          } else {
            attack(1, 1);
          }
          break;
        case "B3":
          if (coordinatesAttacked.includes(enteredLocation)) {
            positionsAttacked();
          } else {
            attack(1, 2);
          }
          break;
        case "C1":
          if (coordinatesAttacked.includes(enteredLocation)) {
            positionsAttacked();
          } else {
            attack(2, 0);
          }
          break;
        case "C2":
          if (coordinatesAttacked.includes(enteredLocation)) {
            positionsAttacked();
          } else {
            attack(2, 1);
          }
          break;
        case "C3":
          if (coordinatesAttacked.includes(enteredLocation)) {
            positionsAttacked();
          } else {
            attack(2, 2);
          }
          break;
      }
    };
    scanWaters();
  };
  continueGame();
};
startGame();
