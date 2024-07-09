export default class Layer {
    constructor(jeux,image, speedModifier) {
      this.jeux = jeux;
      this.image = image;
      this.speedModifier = speedModifier;
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;

      this.speed = this.jeux.gameSpeed * this.speedModifier;
    }

    actualiser() {
      this.speed = this.jeux.gameSpeed * this.speedModifier;

      if (this.x <= -this.width) {
        this.x = 0;
      }

      this.x = Math.floor(this.x - this.speed);
    }

    dessiner(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }
 