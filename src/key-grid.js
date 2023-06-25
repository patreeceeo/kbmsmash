import { shuffle } from './shuffle.js';

const gridWidth = 5;
const gridHeight = 5;
const pool = 'abcdefghijklmnopqrstuvwxyz'.split('')
const canvas = document.getElementById('foreground');
const container = document.getElementById('keygrid');

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
  drawKeyGrid();
}

function setContainerDimensions() {
  container.style.width = `${canvas.clientWidth}px`;
  container.style.height = `${canvas.clientHeight}px`;
}

// listen to document size changes and resize grid container
setContainerDimensions()
const resizeObserver = new ResizeObserver(() => {
  setContainerDimensions();
});

function drawKeyGrid() {
  // first, clear out container
  container.innerHTML = '';

  // draw a div for each row
  for (let x = 0; x <= gridWidth-1; x++) {
    // draw a div for each column
    for (let y = 0; y <= gridHeight-1; y++) {
      const cell = document.createElement('div');
      cell.classList.add('keygrid-cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.innerText = keyGrid.get(`${x},${y}`).character;
      container.appendChild(cell);
    }
  }
}
