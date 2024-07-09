export class Joueur {
  constructor(jeux) {
    this.jeux = jeux;
    this.image = document.getElementById("dogSprite");
    this.spriteWidth = 575;
    this.spriteHeight = 523;
    this.frameX = 0;
    this.frameY = 0;
  }
  dessiner(context) {
  
    context.drawImage(
      this.image,
      this.frameX,
      this.frameY,
      this.spriteWidth,
      this.spriteHeight,
      0,
      0,
      this.jeux.canvas.width,
      this.jeux.canvas.height
    );
  }
  actualiser() {
    let position =
      Math.floor(this.jeux.gameFrame / this.jeux.staggerFrames) %
      this.jeux.spriteAnimations[this.jeux.playerState].loc.length;

    this.frameX = this.spriteWidth * position;
    this.frameY =
      this.jeux.spriteAnimations[this.jeux.playerState].loc[position].y;
  }
}
