const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let grid = [];
const ships = {
  two: 2,
  threeA: 3,
  threeB: 3,
  four: 4,
  five: 5,
};
let shipsPlaced = [];

let createGrid = () => {
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      grid.push([letters[i] + nums[j]]);
    }
  }
  return grid;
};
createGrid();

let placeShip = () => {
  for (let ship in ships) {
    ships[ship];
    let placed = false;
    if (!placed) {
      const row = Math.floor(Math.random() * nums.length);
      const col = Math.floor(Math.random() * letters.length);
      grid[row][col] = ships[ship];
      shipsPlaced.push(ships[ship]);
      placed = true;
      shipsPlaced;
    }
  }
  return grid;
};
placeShip();
