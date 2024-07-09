export default class Joueur {
    constructor(jeux) {
      this.jeux = jeux;
      this.collisionX = this.jeux.width * 0.5;
      this.collisionY = this.jeux.height * 0.5;
      this.collisionRadius = 30;
      this.speedX = 0;
      this.speedY = 0;
      this.dx = 0;
      this.dy = 0;
      this.modificateurVitesse = 5;
      this.image = document.getElementById("bull");
      this.spriteWidth = 255;
      this.spriteHeight = 256;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 100;
      this.frameX = 0;
      this.frameY = 0;
    }
    restart() {
      this.collisionX = this.jeux.width * 0.5;
      this.collisionY = this.jeux.height * 0.5;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 100;
    }
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
        context.beginPath();
        context.moveTo(this.collisionX, this.collisionY);
        context.lineTo(this.jeux.souris.x, this.jeux.souris.y);
        context.stroke();
      }
    }
    actualiser() {
      this.dx = this.jeux.souris.x - this.collisionX;
      this.dy = this.jeux.souris.y - this.collisionY;
      const angle = Math.atan2(this.dy, this.dx);
      if (this.dy < 0) {
        if (angle > -0.39) this.frameY = 2;
        else if (angle > -1.17) this.frameY = 1;
        else if (angle > -1.96) this.frameY = 0;
        else if (angle > -2.74) this.frameY = 7;
        else if (angle > -Math.PI) this.frameY = 6;
      } else {
        if (angle < 0.39) this.frameY = 2;
        else if (angle < 1.17) this.frameY = 3;
        else if (angle < 1.96) this.frameY = 4;
        else if (angle < 2.74) this.frameY = 5;
        else if (angle < Math.PI) this.frameY = 6;
      }

      const distance = Math.hypot(this.dy, this.dx);
      if (distance > this.modificateurVitesse) {
        this.speedX = this.dx / distance || 0;
        this.speedY = this.dy / distance || 0;
      } else {
        this.speedX = 0;
        this.speedY = 0;
      }

      this.collisionX += this.speedX * this.modificateurVitesse;
      this.collisionY += this.speedY * this.modificateurVitesse;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 100;

      //les limites horizontales
      if (this.collisionX < this.collisionRadius) {
        this.collisionX = this.collisionRadius;
        this.frameY = 2;
      }
      if (this.collisionX > this.jeux.width - this.collisionRadius) {
        this.collisionX = this.jeux.width - this.collisionRadius;
        this.frameY = 6;
      }
      if (this.collisionY < this.jeux.marginTop) {
        this.collisionY = this.jeux.marginTop;
        this.frameY = 4;
      }
      if (this.collisionY > this.jeux.height - this.collisionRadius) {
        this.collisionY = this.jeux.height - this.collisionRadius;
        this.frameY = 0;
      }

      // collisions avec les obstacles
      this.jeux.obstacles.forEach((obstacle) => {
        //[isCollision,distance,sommeDesRayons,dx,dy]
        //destructuring assignment
        const [isCollision, distance, sommeDesRayons, dx, dy] =
          this.jeux.checkCollision(this, obstacle);
        if (isCollision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = obstacle.collisionX + (sommeDesRayons + 1) * unit_x;
          this.collisionY = obstacle.collisionY + (sommeDesRayons + 1) * unit_y;
        }
      });
    }
  }