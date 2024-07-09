import { SKILSICON } from "../../../../static/db.js";
import { Competence, Larve } from "./nouveauNee.js";

export default class Oeuf {
    constructor(jeux) {
      this.jeux = jeux;
      this.collisionRadius = 40;
      this.margin = this.collisionRadius * 2;
      this.collisionX =
        this.margin + Math.random() * (this.jeux.width - this.margin * 2);
      this.collisionY =
        this.jeux.marginTop +
        Math.random() * (this.jeux.height - this.jeux.marginTop - this.margin);
      this.image = document.getElementById("egg");
      this.spriteWidth = 110;
      this.spriteHeight = 135;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 30;
      this.trappeTimer = 0;
      this.trappeInterval = 5000;
      this.marquePourSuppression = false;
    }
    restart() {}
    dessiner(context) {
      context.drawImage(
        this.image,
        0,
        0,
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
        context.fillText(
          ((this.trappeInterval - this.trappeTimer) / 1000).toFixed(0),
          this.spriteX + this.spriteWidth / 2 - 6,
          this.spriteY
        );
      }
    }
    actualiser(deltaTime) {
      let elementsOBjects = [
        ...this.jeux.obstacles,
        ...this.jeux.enemies,
        ...this.jeux.nouveauNes,
        this.jeux.joueur,
      ];
      elementsOBjects.forEach((el) => {
        const [isCollision, distance, sommeDesRayons, dx, dy] =
          this.jeux.checkCollision(this, el);
        if (isCollision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = el.collisionX + (sommeDesRayons + 1) * unit_x;
          this.collisionY = el.collisionY + (sommeDesRayons + 1) * unit_y;
          this.spriteX = this.collisionX - this.width * 0.5;
          this.spriteY = this.collisionY - this.height * 0.5 - 30;
        }
      });
      //trappe
      if (
        this.trappeTimer > this.trappeInterval ||
        this.collisionY < this.jeux.marginTop
      ) {
        this.marquePourSuppression = true;
        const frame = SKILSICON[Math.floor(Math.random() * SKILSICON.length)];
        const newElements =
          Math.floor(Math.random() * 10) % 2 === 0
            ? new Competence(
                this.jeux,
                this.spriteX,
                this.spriteY,
                frame.x,
                frame.y
              )
            : new Larve(this.jeux, this.spriteX, this.spriteY);
        this.jeux.nouveauNes.push(newElements);
        this.trappeTimer = 0;
        this.jeux.deleteElementDeJeux();
      } else {
        this.trappeTimer += deltaTime;
      }
    }
  }