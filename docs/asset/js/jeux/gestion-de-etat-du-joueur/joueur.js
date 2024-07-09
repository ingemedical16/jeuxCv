import {
  FALLINGLeft,
  FALLINGRight,
  JumpingLeft,
  JumpingRight,
  RunningLeft,
  RunningRight,
  SittingLeft,
  SittingRight,
  StandingLeft,
  StandingRight,
} from "./state.js";

export default class Joueur {
  constructor(jeux) {
    this.jeux = jeux;
    this.image = document.getElementById("dogSprite");
    this.spriteWidth = 200;
    this.spriteHeight = 181.83;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.states = [
      new StandingLeft(this),
      new StandingRight(this),
      new SittingLeft(this),
      new SittingRight(this),
      new RunningLeft(this),
      new RunningRight(this),
      new JumpingLeft(this),
      new JumpingRight(this),
      new FALLINGLeft(this),
      new FALLINGRight(this),
    ];
    this.currentState = this.states[1];
    this.x = this.jeux.canvas.width / 2 - this.width / 2;
    this.y = this.jeux.canvas.height - this.height - 200;
    this.vy = 0;
    this.weight = 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 6;
    this.speed = 0;
    this.maxSpeed = 10;
    this.fps = 30;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }
  dessiner(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  actualiser() {
    this.currentState.handleInput(this.jeux.input.lastKey);
    //horizontal movement

    this.x += this.speed;
    if (this.x <= 0) this.x = 0;
    else if (this.x >= this.jeux.canvas.width - this.width )
      this.x = this.jeux.canvas.width - this.width ;

    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) {
      this.vy += this.weight;
    } else {
      this.vy = 0;
    }
    if (this.y > this.jeux.canvas.height - this.height - 100)
      this.y = this.jeux.canvas.height - this.height - 100;

    if (this.y < 10)
      for (let i = 0; this.y < 10; i++) {
        this.y = i;
      }
  }

  /**
   * cette méthode actualisé le curentState en fournir index de state corespondent.
   * @param {Number} state
   */
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  /**
   * cette méthode renvoi true si le jour en bas sur la ground si non envoi false
   * @returns
   */
  onGround() {
    return this.y >= this.jeux.canvas.height - this.height - 100;
  }
}
