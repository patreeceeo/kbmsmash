// array of keys pressed
import { WIDTH, HEIGHT } from './constants.js'

const input = {
  keysPressed: [],
  position: { x: 0 , y: 0 }
};

const canvas = document.getElementById('foreground');

canvas.addEventListener("click", async () => {
  await canvas.requestPointerLock();
});

document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement === canvas) {
    input.position.x += e.movementX;
    input.position.y += e.movementY;
  }
}, false);


// on esc, break out of pointer lock
document.addEventListener("keydown", (e) => {
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