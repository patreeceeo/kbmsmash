import { shuffle } from './shuffle.js';
import { CHAR_POOL, GRID_WIDTH, GRID_HEIGHT } from './constants.js';
import { getForegroundCanvas } from './graphics.js';

const container = document.getElementById('keygrid');
container.style.opacity = 0;

const keyGrid = new Map();
export { keyGrid }

export function setContainerDimensions() {
  const canvas = getForegroundCanvas();
  container.style.width = `${canvas.clientWidth}px`;
  container.style.height = `${canvas.clientHeight}px`;
  window.setTimeout(() => {
    container.style.opacity = 1;
  }, 500);
}

const resizeObserver = new ResizeObserver(() => {
  setContainerDimensions();
});

resizeObserver.observe(getForegroundCanvas());


function drawKeyGrid() {

  // first, clear out container
  container.innerHTML = '';

  // draw a div for each row
  for (let x = 0; x <= GRID_WIDTH - 1; x++) {
    // draw a div for each column
    for (let y = 0; y <= GRID_WIDTH - 1; y++) {
      const cell = document.createElement('div');
      cell.classList.add('keygrid-cell');
      cell.style.width = `${100 / GRID_WIDTH}%`;
      cell.style.height = `${100 / GRID_WIDTH}%`;
      cell.style.left = `${x * (100 / GRID_WIDTH)}%`;
      cell.style.top = `${y * (100 / GRID_WIDTH)}%`;
      cell.innerText = `${keyGrid.get(`${x},${y}`).character}`;
      container.appendChild(cell);
    }
  }
}

const REFRESH_TIME = 5000;
let surpassedTime = 0;
export function generateGrid(deltaTime) {
  surpassedTime += deltaTime;
  if (surpassedTime < REFRESH_TIME) return;
  surpassedTime = 0;
  const characters = shuffle(CHAR_POOL);
  let i = 0

  for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      keyGrid.set(`${x},${y}`, { x, y, character: characters[i] });
      i++;
    }
  }
  drawKeyGrid();
}

generateGrid()
