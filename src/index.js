import { getCache, loadSprite, SpriteState } from "./graphics.js";

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
