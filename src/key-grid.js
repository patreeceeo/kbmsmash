import { shuffle } from './shuffle.js';
import { CHAR_POOL, GRID_WIDTH, GRID_HEIGHT } from './constants.js';

const canvas = document.getElementById('foreground');
const container = document.getElementById('keygrid');

const keyGrid = new Map();
export { keyGrid }

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
  for (let x = 0; x <= GRID_WIDTH-1; x++) {
    // draw a div for each column
    for (let y = 0; y <= GRID_WIDTH-1; y++) {
      const cell = document.createElement('div');
      cell.classList.add('keygrid-cell');
      cell.innerText = keyGrid.get(`${x},${y}`).character;
      container.appendChild(cell);
    }
  }
}

let surpassedTime = 0;
export function generateGrid(deltaTime) {
  surpassedTime += deltaTime;
  if (surpassedTime < 2000) return;
  surpassedTime = 0;
  const characters = shuffle(CHAR_POOL);
  let i = 0
  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      keyGrid.set(`${x},${y}`, {x, y, character: characters[i] });
      i++;
    }
  }
  drawKeyGrid();
}

generateGrid()
