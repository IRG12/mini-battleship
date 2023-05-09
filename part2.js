const readlineSync = require("readline-sync");

const boardSize = 10;
const shipLengths = [2, 3, 3, 4, 5];
const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
let numShips = shipLengths.length;
const letterToNum = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
};

function placeShips() {
  shipLengths.forEach((shipLength) => {
    let shipPlaced = false;
    while (!shipPlaced) {
      const direction = Math.floor(Math.random() * 2);
      const [x, y] = [
        direction === 0
          ? Math.floor(Math.random() * (boardSize - shipLength + 1))
          : Math.floor(Math.random() * boardSize),
        direction === 1
          ? Math.floor(Math.random() * (boardSize - shipLength + 1))
          : Math.floor(Math.random() * boardSize),
      ];
      const intersect = Array.from({ length: shipLength }, (_, j) =>
        direction === 0 ? board[x + j][y] : board[x][y + j]
      ).some((val) => val === 1);
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

console.log("Press any key to start the game.");
readlineSync.keyIn();

let hits = 0;
let guesses = new Set();

while (numShips > 0) {
  console.log(
    board
      .map((row) => row.map((val) => (val === 0 ? "-" : "X")).join(" "))
      .join("\n")
  );
  const guess = readlineSync.question(
    "Enter a location to strike, e.g. 'A2': "
  );
  const [x, y] = [letterToNum[guess[0]], Number(guess[1]) - 1];
  if (guesses.has(`${x},${y}`)) {
    console.log("You have already picked this location. Miss!");
  } else if (board[x][y] === 1) {
    console.log("Hit!");
    board[x][y] = 2;
    hits++;
    numShips--;
  } else {
    console.log("You have missed!");
    guesses.add(`${x},${y}`);
  }
}

console.log(
  board
    .map((row) =>
      row.map((val) => (val === 0 ? "-" : val === 1 ? "X" : "O")).join(" ")
    )
    .join("\n")
);
const playAgain = readlineSync.keyInYNStrict(
  "You have destroyed all battleships. Would you like to play again?"
);
if (playAgain) {
  // Reset the board and guesses
  board.forEach((row) => row.fill(0));
  guesses.clear();
  placeShips();
  numShips = shipLengths.length;
  hits = 0;
} else {
  console.log("Thanks for playing!");
}
