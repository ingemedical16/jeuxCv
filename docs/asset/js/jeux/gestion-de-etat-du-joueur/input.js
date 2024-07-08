import { KEYEVENT } from "../../../../static/db.js";
export default class InputHandler {
  constructor() {
    this.lastKey = "";

    window.addEventListener("keydown", (e) => {
      console.log(this.lastKey);
      switch (e.key) {
        case "ArrowRight":
          this.lastKey = KEYEVENT.PRESS_RIGHT;
          break;
        case "ArrowLeft":
          this.lastKey = KEYEVENT.PRESS_LEFT;
          break;
        case "ArrowUp":
          this.lastKey = KEYEVENT.PRESS_UP;
          break;
        case "ArrowDown":
          this.lastKey = KEYEVENT.PRESS_DOWN;
          break;
        case "Enter":
          this.lastKey = KEYEVENT.PRESS_ENTER;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
        console.log(this.lastKey);
      switch (e.key) {
        case "ArrowRight":
          this.lastKey = KEYEVENT.RELEASE_RIGHT;
          break;
        case "ArrowLeft":
          this.lastKey = KEYEVENT.RELEASE_LEFT;
          break;
        case "ArrowUp":
          this.lastKey = KEYEVENT.RELEASE_UP;
          break;
        case "ArrowDown":
          this.lastKey = KEYEVENT.RELEASE_DOWN;
          break;
        case "Enter":
          this.lastKey = KEYEVENT.RELEASE_ENTER;
          break;
      }
    });
  }
}
