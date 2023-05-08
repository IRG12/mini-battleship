const readlineSync = require("readline-sync");

let boardSize = 10;
let shipLengths = [5, 4, 3, 3, 2];
let board = Array.from({ length: boardSize }, () =>
  Array.from({ length: boardSize }, () => 0)
);
let shipLengthsHit = {};
let shipsSunk = 0;

function placeShip(shipLength) {
  let shipPlaced = false;
  while (!shipPlaced) {
    const direction = Math.floor(Math.random() * 2); // 0 for horizontal, 1 for vertical
    let x, y;
    if (direction === 0) {
      x = Math.floor(Math.random() * (boardSize - shipLength + 1));
      y = Math.floor(Math.random() * boardSize);
      if (
        !board
          .slice(x, x + shipLength)
          .some((row) => row.slice(y, y + 1).some((cell) => cell === 1))
      ) {
        board.slice(x, x + shipLength).forEach((row) => (row[y] = 1));
        shipPlaced = true;
      }
    } else {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * (boardSize - shipLength + 1));
      if (
        !board
          .slice(x, x + 1)
          .some((row) =>
            row.slice(y, y + shipLength).some((cell) => cell === 1)
          )
      ) {
        board[x]
          .slice(y, y + shipLength)
          .forEach((_, i) => (board[x][y + i] = 1));
        shipPlaced = true;
      }
    }
  }
}

function placeShips() {
  shipLengths.forEach(placeShip);
}
placeShips();

const playAgain = () => {
  let playAgain = readlineSync.keyInYN(
    'You have destroyed all battleships. Would you like to play again? Y/N"'
  );
  if (!playAgain) {
    // Key that is not `Y` was pressed.
    process.exit();
  }
  boardSize = 10;
  shipLengths = [5, 4, 3, 3, 2];
  board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => 0)
  );
  shipLengthsHit = {};
  shipsSunk = 0;
  startGame();
};

const startGame = () => {
  readlineSync.keyInPause("Press any key to start the game. ");
  const continueGame = () => {
    const userGuess = () => {
      return readlineSync.question(`Enter a location to strike i.e.: 'A2'. `);
    };
    let guessedLocation = userGuess();

    function convertUserInput(input) {
      const letters = "ABCDEFGHIJ";
      const row = Number(input.slice(1)) - 1;
      const col = letters.indexOf(input[0].toUpperCase());
      return [row, col];
    }
    let convertedGuess = convertUserInput(guessedLocation);
    function fire(x, y) {
      if (board[x][y] === 0) {
        console.log("You missed!");
      } else if (board[x][y] === -1) {
        console.log("You have already picked this location. Miss!");
        guessedLocation = userGuess(); // // update guessedLocation with new input
        fire(...convertUserInput(guessedLocation)); // fire on new position
      } else if (board[x][y] > 0) {
        const shipId = board[x][y];
        shipLengthsHit[shipId] = (shipLengthsHit[shipId] || 0) + 1;
        board[x][y] = -1;
        const shipLength = shipLengths[shipId - 1];
        if (shipLengthsHit[shipId] === shipLength) {
          console.log(`You sunk a ship of length ${shipLength}!`);
          shipsSunk++;
          if (shipsSunk === shipLengths.length) {
            console.log("Congratulations! You have sunk all the battleships!");
            playAgain();
          }
        } else {
          console.log(`You hit a ship of length ${shipLength}!`);
        }
      }
    }
    fire(convertedGuess);
  };
  continueGame();
};
startGame();
