import { shuffle } from './shuffle.js';

const gridWidth = 5;
const gridHeight = 5;
const container = document.getElementById('keygrid');
const pool = 'abcdefghijklmnopqrstuvwxyz'.split('')

const keyGrid = new Map();
generateGrid()

export { keyGrid }

export function generateGrid() {
  const characters = shuffle(pool);

  let i = 0
  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      keyGrid.set(`${x},${y}`, {x, y, character: characters[i] });
      i++;
    }
  }
}


function drawKeyGrid() {

}
