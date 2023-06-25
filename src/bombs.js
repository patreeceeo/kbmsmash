import { GRID_WIDTH, GRID_HEIGHT } from './constants.js';

const bombPositions = new Map();

export function generateBombs() {
  let i = 0
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      bombPositions.set(`${x},${y}`, {x, y, active: false });
      i++;
    }
  }
}

console.log(bombPositions)

export function updateBombs(tick) {
  return null;
}