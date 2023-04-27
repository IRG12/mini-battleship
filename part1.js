const readlineSync = require("readline-sync");

// Wait for user's response.
const userName = readlineSync.keyInPause("Press any key to start the game. ");

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
let ships = placeShipsRandomly();
console.log(ships);
const location = readlineSync.question(`Enter a location to strike ie 'A2'. `);

const scanWaters = () => {
  let result;
  for (let row of ships) {
    for (let col of row) {
      if (col !== "Ship1" || col !== "Ship2") {
        result = null;
      }
      result = col;
    }
  }
  return result;
};
switch (location) {
  case "A1":
    console.log(scanWaters([0][0]));
  case "A2":
    console.log(scanWaters([0][1]));
  case "A3":
    console.log(scanWaters([0][2]));
  case "B1":
    console.log(scanWaters([1][0]));
  case "B2":
    console.log(scanWaters([1][1]));
  case "B3":
    console.log(scanWaters([1][2]));
  case "C1":
    console.log(scanWaters([2][0]));
  case "C2":
    console.log(scanWaters([2][1]));
  case "C3":
    console.log(scanWaters([2][2]));
}
