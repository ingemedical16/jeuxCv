import { dogAnimationStates } from "../../../../static/db.js";
import { Joueur } from "./joueur.js";
export default class Jeux {
  constructor(canvas) {
    this.canvas = canvas;
    this.playerState = "fail";
    this.dropdown = document.getElementById("animations");
    this.gameFrame = 0;
    this.staggerFrames = 3;
    this.spriteAnimations = [];
    this.animationStates = dogAnimationStates;
    this.joueur = new Joueur(this);

    // events
    this.dropdown.addEventListener("change", (e) => {
      this.playerState = e.target.value;
    });
  }
  restart() {}
  render(context, deltaTime) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.joueur.dessiner(context);
    this.joueur.actualiser();
  }
  init() {
    this.animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      };
      for (let j = 0; j < state.frames; j++) {
        let positionX = j * this.joueur.spriteWidth;
        let positionY = index * this.joueur.spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
      }
      this.spriteAnimations[state.name] = frames;
    });
  }
}
