
import  Joueur  from "./joueur.js";
import  InputHandler from './input.js'
export default class Jeux {
  constructor(canvas) {
    this.canvas = canvas;
    this.joueur = new Joueur(this);
    this.input = new InputHandler;

  
  }
  restart() {}
  render(context) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.joueur.dessiner(context);
    this.joueur.actualiser();
  }
  init(){}
}
