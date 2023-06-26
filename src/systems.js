import { input } from "./event-handling.js";
import { GRID_HEIGHT, GRID_WIDTH, HEIGHT, WIDTH } from "./constants.js";
import { character, updateSpriteKey, updateVelocity } from "./character.js";
import { getCache, getForegroundCanvas, SpriteState } from "./graphics.js";
import { bombPositions } from "./bombs.js";
import { clamp, isZero } from "./vec2.js";
import { rad2deg } from "./math.js";
import { play } from "./audio.js";
import { EXPLODE_RADIUS } from "./collision-detection.js";

export function inputSystem() {
  const pos = input.position;
  if (input.leftClick) {
    clamp(input.position, 1);
    pos.angle = rad2deg(Math.atan2(pos.y, pos.x));
    pos.magnitude = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
  } else {
    pos.magnitude = 0;
    pos.x = pos.y = 0;
  }
}

/** @param {number} deltaTime */
export function movementSystem(deltaTime) {
  // update character position every frame.
  // character moves 1 unit per frame.
  updateVelocity(input.position, deltaTime);
  if (!isZero(character.velocity)) {
    play("walk");
  }
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
  updateSpriteKey();
}

/** @param {number} deltaTime */
export function graphicsSystem(deltaTime) {
  const canvas = getForegroundCanvas();

  const sprite = SpriteState.find("robot", character.spriteKey);
  const image = getCache(sprite.imageId);
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
    const { x, y, explodedCountdown, color, spriteSet, spriteKey } = val;
    const xCoord = (x + 0.5) * (WIDTH / GRID_WIDTH);
    const yCoord = (y + 0.5) * (HEIGHT / GRID_HEIGHT);

    // bomb image
    const bombSprite = SpriteState.find(spriteSet, spriteKey);
    const bombImg = getCache(bombSprite.imageId);

    const xOffset = spriteSet === "bomb" ? 24 : 32;
    const yOffset = spriteSet === "bomb" ? 60 : 30;

    ctx.lineWidth = 0;
    ctx.strokeStyle = "transparent";
    ctx.fillStyle = color;
    const radius = EXPLODE_RADIUS;
    if (explodedCountdown > 0) {
      ctx.ellipse(xCoord, yCoord, radius, radius, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    ctx.drawImage(bombImg, xCoord - xOffset, yCoord - yOffset);
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
