export default class Enemy {
    constructor(jeux) {
      this.jeux = jeux;
      this.image = document.getElementById("toads");
      this.collisionRadius = 30;
      this.spriteWidth = 140;
      this.spriteHeight = 260;
      this.speedX = Math.random() * 3 + 0.5;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.collisionX =
        this.jeux.width + this.width + Math.random() * this.jeux.width * 0.5;
      this.collisionY =
        this.jeux.marginTop +
        Math.random() * (this.jeux.height - this.jeux.marginTop);
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 30;
      this.frameX = 0;
      this.frameY = Math.floor(Math.random() * 4);
    }
    restart() {}
    dessiner(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );

      if (this.jeux.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
      }
    }
    actualiser() {
      this.collisionX -= this.speedX;

      if (this.spriteX + this.width < 0 && !this.jeux.jeuTermine) {
        this.collisionX =
          this.jeux.width + this.width + Math.random() * this.jeux.width * 0.5;
        this.collisionY =
          this.jeux.marginTop +
          Math.random() * (this.jeux.height - this.jeux.marginTop);
        this.frameY = Math.floor(Math.random() * 4);
      }
      let elementsObject = [...this.jeux.obstacles, this.jeux.joueur];
      elementsObject.forEach((el) => {
        const [isCollision, distance, sommeDesRayons, dx, dy] =
          this.jeux.checkCollision(this, el);
        if (isCollision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = el.collisionX + (sommeDesRayons + 1) * unit_x;
          this.collisionY = el.collisionY + (sommeDesRayons + 1) * unit_y;
        }
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height + 40;
      });
    }
  }