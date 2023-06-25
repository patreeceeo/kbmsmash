import { graphicsSystem, movementSystem } from './systems.js';
import { loadSprite } from "./graphics.js";
import { keyGrid, generateGrid } from './key-grid.js';
import { updateBombs } from './bombs.js'

loadSprite("/assets/BombDefusalRobot0008.png", "robot", "idle",48, 48).then(() => {
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



