import { CompetenceAcquise, Etincelle } from "./Particule.js";

export class Competence {
    constructor(jeux, x, y, frameX, frameY) {
      this.jeux = jeux;
      this.collisionRadius = 60;
      this.marquePourSuppression = false;
      this.collisionX = x;
      this.collisionY = y;
      this.frameX = frameX;
      this.frameY = frameY;
      this.image = document.getElementById("skils");
      this.spriteWidth = 120;
      this.spriteHeight = 120;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 -40;
      this.speedY = 1 + Math.random();
    }
    restart() {}
    dessiner(context) {
      context.drawImage(
        this.image,
        this.frameX,
        this.frameY,
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
      this.collisionY -= this.speedY;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5-40;
      //  movement de competences et larva in sécurité
      if (this.collisionY < this.jeux.marginTop) {
        this.marquePourSuppression = true;
        this.jeux.deleteElementDeJeux();
        if (!this.jeux.jeuTermine) this.jeux.score++;
        for (let i = 0; i < 5; i++) {
          this.jeux.particules.push(
            new CompetenceAcquise(
              this.jeux,
              this.collisionX,
              this.collisionY,
              "#ff1dce"
            )
          );
        }
      }
      // collision
      let elementsOBjects = [...this.jeux.obstacles, this.jeux.joueur];
      elementsOBjects.forEach((el) => {
        const [isCollision, distance, sommeDesRayons, dx, dy] =
          this.jeux.checkCollision(this, el);
        if (isCollision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = el.collisionX + (sommeDesRayons + 1) * unit_x;
          this.collisionY = el.collisionY + (sommeDesRayons + 1) * unit_y;
          this.spriteX = this.collisionX - this.width * 0.5;
          this.spriteY = this.collisionY - this.height * 0.5 - 40;
        }
      });
      // collision avec les emmies
      this.jeux.enemies.forEach((enemy) => {
        if (this.jeux.checkCollision(this, enemy)[0]) {
          this.marquePourSuppression = true;
          this.jeux.deleteElementDeJeux();
          if (!this.jeux.jeuTermine) this.jeux.competencesPerdu++;
          for (let i = 0; i < 3; i++) {
            this.jeux.particules.push(
              new Etincelle(this.jeux, this.collisionX, this.collisionY, "red")
            );
          }
        }
      });
    }
  }
export class Larve {
    constructor(jeux, x, y) {
      this.jeux = jeux;
      this.collisionRadius = 30;
      this.marquePourSuppression = false;
      this.collisionX = x;
      this.collisionY = y;
      this.image = document.getElementById("larva");
      this.spriteWidth = 150;
      this.spriteHeight = 150;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 50;
      this.speedY = 1 + Math.random();
      this.frameY = Math.floor(Math.random() * 2);
      this.frameX = 0;
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
      this.collisionY -= this.speedY;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 50;
      //  movement de competences et larva in sécurité
      if (this.collisionY < this.jeux.marginTop) {
        this.marquePourSuppression = true;
        this.jeux.deleteElementDeJeux();
        if (!this.jeux.jeuTermine) this.jeux.score++;
        for (let i = 0; i < 5; i++) {
          this.jeux.particules.push(
            new CompetenceAcquise(
              this.jeux,
              this.collisionX,
              this.collisionY,
              "yellow"
            )
          );
        }
      }
      // collision
      let elementsOBjects = [...this.jeux.obstacles, this.jeux.joueur];
      elementsOBjects.forEach((el) => {
        const [isCollision, distance, sommeDesRayons, dx, dy] =
          this.jeux.checkCollision(this, el);
        if (isCollision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = el.collisionX + (sommeDesRayons + 1) * unit_x;
          this.collisionY = el.collisionY + (sommeDesRayons + 1) * unit_y;
          this.spriteX = this.collisionX - this.width * 0.5;
          this.spriteY = this.collisionY - this.height * 0.5 - 50;
        }
      });
      // collision avec les emmies
      this.jeux.enemies.forEach((enemy) => {
        if (this.jeux.checkCollision(this, enemy)[0] && !this.jeux.jeuTermine) {
          this.marquePourSuppression = true;
          this.jeux.deleteElementDeJeux();
          if (!this.jeux.jeuTermine) this.jeux.competencesPerdu++;
          for (let i = 0; i < 5; i++) {
            this.jeux.particules.push(
              new Etincelle(this.jeux, this.collisionX, this.collisionY, "red")
            );
          }
        }
      });
    }
  }