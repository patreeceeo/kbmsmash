import { getCache, loadSprite, SpriteState } from "./graphics.js";
import { input } from './event-handling.js'
import { character } from './character.js'
import { HEIGHT, WIDTH } from './constants.js';
import { keyGrid, generateGrid } from './key-grid.js';

loadSprite("/assets/BombDefusalRobot0008.png", "robot", "idle",48, 48).then(() => {

  const canvas = /** @type {HTMLCanvasElement} */(document.getElementById("foreground"));
  const sprite = SpriteState.find("robot", "idle");
  const image = getCache(sprite.imageId);
  const ctx = /** @type {CanvasRenderingContext2D} */  (canvas.getContext("2d"));
    ctx.drawImage(
      image,
      0,
      0
    );
})

// Map keys to grid.
function main() {
  window.requestAnimationFrame(main);
  character.velocity.x = Math.min(1, Math.max(-1, input.position.x));
  character.velocity.y = Math.min(1, Math.max(-1, input.position.y));
  character.position.x = Math.min(WIDTH, Math.max(0,character.position.x += character.velocity.x));
  character.position.y = Math.min(HEIGHT, Math.max(0,character.position.y += character.velocity.y));
}

main();


