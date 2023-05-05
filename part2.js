const readlineSync = require("readline-sync");

const placeShipsRandomly = () => {
  // Define the dimensions of the array
  const rows = 10;
  const cols = 10;

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
