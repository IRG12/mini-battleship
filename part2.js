const readline = require("readline-sync");

const boardSize = 10;
const shipLengths = [5, 4, 3, 3, 2];
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
let numShips = shipLengths.length;
let hits = 0;

function printBoard() {
  console.log(
    board
      .map((row) =>
        row.map((cell) => (cell === 0 || cell === 1 ? "-" : cell)).join(" ")
      )
      .join("\n")
  );
}

function placeShips() {
  const occupiedCells = new Set();
  const shipLengths = [2, 3, 3, 4, 5]; // specify the lengths of the ships
  for (let i = 0; i < shipLengths.length; i++) {
    const shipLength = shipLengths[i];
    let shipPlaced = false;
    while (!shipPlaced) {
      const direction = Math.floor(Math.random() * 2);
      let [x, y] = [
        direction === 0
          ? Math.floor(Math.random() * (boardSize - shipLength + 1))
          : Math.floor(Math.random() * boardSize),
        direction === 1
          ? Math.floor(Math.random() * (boardSize - shipLength + 1))
          : Math.floor(Math.random() * boardSize),
      ];
      const cells = new Set();
      let intersect = false;
      for (let j = 0; j < shipLength; j++) {
        if (x >= boardSize || y >= boardSize) {
          intersect = true;
          break;
        }
        const cell = direction === 0 ? board[x + j][y] : board[x][y + j];
        if (
          occupiedCells.has(`${x + j},${y}`) ||
          occupiedCells.has(`${x},${y + j}`)
        ) {
          intersect = true;
          break;
        }
        cells.add(`${x + j},${y}`);
        cells.add(`${x},${y + j}`);
      }
      if (!intersect) {
        cells.forEach((cell) => {
          const [x, y] = cell.split(",").map((val) => parseInt(val));
          board[x][y] = shipLength;
          occupiedCells.add(cell);
        });
        shipPlaced = true;
      }
    }
  }
}

function processGuess(x, y) {
  if (board[x][y] === 0) {
    console.log("You have missed!");
    board[x][y] = -1;
  } else if (board[x][y] > 1) {
    const shipLength = board[x][y];
    board[x][y] = -shipLength;
    hits++;
    console.log(`Hit! You hit a ship with length ${shipLength}.`);
    if (hits === shipLengths.reduce((acc, curr) => acc + curr, 0)) {
      console.log(`You sunk all the ships!`);
      return true;
    } else if (
      board
        .flat()
        .filter((cell) => cell > 1)
        .indexOf(shipLength) === -1
    ) {
      numShips--;
      console.log(
        `You sunk a ship with length ${shipLength}! ${numShips} remaining.`
      );
    }
  } else {
    console.log("You have already picked this location. Miss!");
  }
  return false;
}

function play() {
  console.log("Press any key to start the game.");
  readline.keyInPause();
  console.log("Generating board...");
  placeShips();
  while (true) {
    console.log("Enter a location to strike (e.g. A2): ");
    const input = readline.prompt();
    const x = input.charCodeAt(0) - 65;
    const y = parseInt(input.slice(1)) - 1;
    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
      if (processGuess(x, y)) {
        console.log("Would you like to play again? Y/N");
        const playAgain = readline.prompt().toUpperCase();
        if (playAgain === "Y") {
          board = Array.from({ length: boardSize }, () =>
            Array(boardSize).fill(0)
          );
          numShips = shipLengths.length;
          hits = 0;
          console.log("Generating board...");
          placeShips();
        } else {
          console.log("Thanks for playing!");
          break;
        }
      }
    } else {
      console.log("Invalid input. Please try again.");
    }
    printBoard();
  }
}

play();
