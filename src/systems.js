import { input } from "./event-handling.js";
import { GRID_HEIGHT, GRID_WIDTH, HEIGHT, VELOCITY_SCALE, WIDTH } from "./constants.js";
import { character } from "./character.js";
import { getCache, getForegroundCanvas, SpriteState } from "./graphics.js";
import { bombPositions } from "./bombs.js";
import { START_RADIUS, EXPLODE_RADIUS} from "./collision-detection.js";

/** @param {number} deltaTime */
export function movementSystem(deltaTime) {
  // update character position every frame.
  // character moves 1 unit per frame.
  character.velocity.x = input.position.x * deltaTime * VELOCITY_SCALE;
  character.velocity.y = input.position.y * deltaTime * VELOCITY_SCALE;
  character.position.x = Math.min(
    WIDTH - character.radius,
    Math.max(
      character.radius,
      (character.position.x += character.velocity.x * deltaTime)
    )
  );

  character.position.y = Math.min(
    HEIGHT - character.radius,
    Math.max(
      character.radius,
      (character.position.y += character.velocity.y * deltaTime)
    )
  );
}

/** @param {number} deltaTime */
export function graphicsSystem(deltaTime) {
  const sprite = SpriteState.find("robot", "idle");
  const image = getCache(sprite.imageId);
  const canvas = getForegroundCanvas();
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.drawImage(
    image,
    character.position.x - character.radius,
    character.position.y - character.radius
  );

  // draw bombs
  for (const [key, val] of bombPositions) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    const { x, y, explodedCountdown, color } = val;
    ctx.strokeStyle = color;
    // x and y are on the key-grid (0-4 for x and y)
    // we need to make them from 0-WIDTH and 0-HEIGHT
    const radius = explodedCountdown ? EXPLODE_RADIUS : START_RADIUS;
    const xCoord = (x + 0.5) * (WIDTH / GRID_WIDTH);
    const yCoord = (y + 0.5) * (HEIGHT / GRID_HEIGHT);

    // TODO: x and y are reduced?!?!?
    ctx.ellipse(
      xCoord,
      yCoord,
      radius,
      radius,
      0,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }


  // draw virtual joystick
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.ellipse(10, 10, 9, 9, 0, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.ellipse(
    input.position.x * 10 + 10,
    input.position.y * 10 + 10,
    2,
    2,
    0,
    0,
    2 * Math.PI
  );
  ctx.stroke();
}
