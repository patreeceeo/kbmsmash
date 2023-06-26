import { graphicsSystem, inputSystem, movementSystem } from './systems.js';
import { gameSystem } from './game-system.js';
import { getForegroundCanvas, loadSprite, setupCanvas } from "./graphics.js";
import { keyGrid, generateGrid } from './key-grid.js';
import { updateBombs } from './bombs.js'
import {HEIGHT, WIDTH} from './constants.js';
import { collisionDetection } from './collision-detection.js';

const promises = [
  loadSprite("/assets/Robot_up.png", "robot", "up", 48, 48),
  loadSprite("/assets/Robot_down.png", "robot", "down", 48, 48),
  loadSprite("/assets/Robot_left.png", "robot", "left", 48, 48),
  loadSprite("/assets/Robot_leftUp.png", "robot", "leftUp", 48, 48),
  loadSprite("/assets/Robot_leftDown.png", "robot", "leftDown", 48, 48),
  loadSprite("/assets/Robot_right.png", "robot", "right", 48, 48),
  loadSprite("/assets/Robot_rightUp.png", "robot", "rightUp", 48, 48),
  loadSprite("/assets/Robot_rightDown.png", "robot", "rightDown", 48, 48),
]

Promise.all(promises).then(() => {
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

  inputSystem();
  movementSystem(deltaTime);
  graphicsSystem(deltaTime);

  generateGrid(deltaTime)

  updateBombs(deltaTime);
  collisionDetection(deltaTime);
  gameSystem(deltaTime);
}



