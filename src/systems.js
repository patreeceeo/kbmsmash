import { input } from "./event-handling.js";
import { HEIGHT, VELOCITY_SCALE, WIDTH } from "./constants.js";
import { character } from "./character.js";
import { getCache, SpriteState } from "./graphics.js";

/** @param {number} deltaTime */
export function inputSystem(deltaTime) {
  input.position.x = 0;
  input.position.y = 0;
}
/** @param {number} deltaTime */
export function movementSystem(deltaTime) {
  // update character position every frame.
  // character moves 1 unit per frame.
  character.velocity.x = input.position.x * deltaTime * VELOCITY_SCALE
  character.velocity.y = input.position.y * deltaTime * VELOCITY_SCALE
  character.position.x = Math.min(
    WIDTH,
    Math.max(0, (character.position.x += character.velocity.x * deltaTime))
  );
  character.position.y = Math.min(
    HEIGHT,
    Math.max(0, (character.position.y += character.velocity.y * deltaTime))
  );
}

/** @param {number} deltaTime */
export function graphicsSystem(deltaTime) {
  const canvas = /** @type {HTMLCanvasElement} */ (
    document.getElementById("foreground")
  );
  const sprite = SpriteState.find("robot", "idle");
  const image = getCache(sprite.imageId);
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(image, character.position.x, character.position.y);


  // draw virtual joystick
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.ellipse(10, 10, 9, 9, 0, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.ellipse(input.position.x * 10 + 10, input.position.y * 10 + 10, 2, 2, 0, 0, 2 * Math.PI);
  ctx.stroke();
}
