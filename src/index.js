import { graphicsSystem, movementSystem } from './systems.js';
import { getForegroundCanvas, loadSprite, setupCanvas } from "./graphics.js";
import { keyGrid, generateGrid } from './key-grid.js';
import { updateBombs } from './bombs.js'
import {HEIGHT, WIDTH} from './constants.js';

loadSprite("/assets/BombDefusalRobot0008.png", "robot", "idle",48, 48).then(() => {
  const canvas = getForegroundCanvas();
  setupCanvas(canvas, {x: WIDTH, y: HEIGHT})
  gameLoop();
})

let lastTime = 0
// Map keys to grid.
function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  const time = performance.now();
  const deltaTime = time - lastTime;
  lastTime = time;

  movementSystem(deltaTime);
  graphicsSystem(deltaTime);

  generateGrid(deltaTime)

  updateBombs(deltaTime);

}



