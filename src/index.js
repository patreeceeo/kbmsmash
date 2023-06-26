import { graphicsSystem, inputSystem, movementSystem } from './systems.js';
import { updateBombs } from './bombs.js'
import { gameSystem } from './game-system.js';
import { getForegroundCanvas, loadSprite, setupCanvas } from "./graphics.js";
import { keyGrid, generateGrid } from './key-grid.js';
import {HEIGHT, WIDTH} from './constants.js';
import { collisionDetection } from './collision-detection.js';

const promises = [
  loadSprite("assets/Robot_up.png", "robot", "up", 48, 48),
  loadSprite("assets/Robot_down.png", "robot", "down", 48, 48),
  loadSprite("assets/Robot_left.png", "robot", "left", 48, 48),
  loadSprite("assets/Robot_leftUp.png", "robot", "leftUp", 48, 48),
  loadSprite("assets/Robot_leftDown.png", "robot", "leftDown", 48, 48),
  loadSprite("assets/Robot_right.png", "robot", "right", 48, 48),
  loadSprite("assets/Robot_rightUp.png", "robot", "rightUp", 48, 48),
  loadSprite("assets/Robot_rightDown.png", "robot", "rightDown", 48, 48),
  loadSprite("assets/Robot_die1.png", "robot", "die1", 48, 48),
  loadSprite("assets/Robot_die2.png", "robot", "die2", 48, 48),
  loadSprite("assets/Robot_die3.png", "robot", "die3", 48, 48),
  loadSprite("assets/Robot_die4.png", "robot", "die4", 48, 48),
  loadSprite("assets/Robot_die5.png", "robot", "die5", 48, 48),
  loadSprite("assets/Robot_die6.png", "robot", "die6", 48, 48),
  loadSprite("assets/Robot_die7.png", "robot", "die7", 48, 48),
  loadSprite("assets/Robot_die8.png", "robot", "die8", 48, 48),
  loadSprite("assets/Robot_die9.png", "robot", "die9", 48, 48),

  loadSprite('assets/Bomb0020.png',"bomb", '6', 48, 80),
  loadSprite('assets/Bomb0021.png',"bomb", '5', 48, 80),
  loadSprite('assets/Bomb0022.png',"bomb", '4', 48, 80),
  loadSprite('assets/Bomb0023.png',"bomb", '3', 48, 80),
  loadSprite('assets/Bomb0024.png',"bomb", '2', 48, 80),
  loadSprite('assets/Bomb0025.png',"bomb", '1', 48, 80),

  loadSprite('assets/Explosion0037.png',"explode", '1', 48, 48),
  loadSprite('assets/Explosion0036.png',"explode", '2', 48, 48),
  loadSprite('assets/Explosion0035.png',"explode", '3', 48, 48),
  loadSprite('assets/Explosion0034.png',"explode", '4', 48, 48),
  loadSprite('assets/Explosion0033.png',"explode", '5', 48, 48),
  loadSprite('assets/Explosion0032.png',"explode", '6', 48, 48),
  loadSprite('assets/Explosion0031.png',"explode", '7', 48, 48),
  loadSprite('assets/Explosion0030.png',"explode", '8', 48, 48)
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
  updateBombs(deltaTime);
  generateGrid(deltaTime)

  collisionDetection(deltaTime);
  gameSystem(deltaTime);
}



