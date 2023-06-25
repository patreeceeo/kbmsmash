import {clamp} from "./vec2.js";

const input = {
  // array of keys pressed
  keysPressed: [],
  position: { x: 0 , y: 0 }
};

const canvas = document.getElementById('foreground');
let firstMove = true;

canvas.addEventListener("click", async () => {
  await canvas.requestPointerLock();
  firstMove = true;
});

document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement === canvas) {
    if(!firstMove){
      const { movementX, movementY } = e;
      input.position.x += Math.min(movementX, 10) / 10;
      input.position.y += Math.min(movementY, 10) / 10;
      clamp(input.position, 1);
    }
    firstMove = false;
  }
}, false);


// on esc, break out of pointer lock
document.addEventListener("keydown", (e) => {
  // ignore repeat events
  if (e.repeat) return;

  input.keysPressed.push(e.key);
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    document.exitPointerLock();
    return;
  }
  input.keysPressed = input.keysPressed.filter((key) => key !== e.key);
});

export { input }
