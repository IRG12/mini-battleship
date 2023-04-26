const readlineSync = require("readline-sync");

// Wait for user's response.
const userName = readlineSync.question("Press any key to start the game. ");
console.log("Hi " + userName + "!");

const grid = [
  ["Miss", "Hit", "Miss"],
  ["Hit", "Miss", "Hit"],
  ["Miss", "Miss", "Miss"],
];

const fillGrid = () => {};

const traverseGrid = () => {
  for (let row of grid) {
    for (let column of row) {
      console.log(column);
    }
  }
};
traverseGrid();
