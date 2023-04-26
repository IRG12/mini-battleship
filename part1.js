const readlineSync = require("readline-sync");

// Wait for user's response.
const userName = readlineSync.question("Press any key to start the game. ");
console.log("Hi " + userName + "!");

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

// Output the resulting 2D array to the console
console.log(grid);
