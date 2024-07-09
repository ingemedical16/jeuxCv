export class Particule {
  constructor(jeux, x, y, couleur) {
    this.jeux = jeux;
    this.collisionX = x;
    this.collisionY = y;
    this.couleur = couleur;
    this.radius = Math.floor(Math.random() * 10 + 5);
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 2 + 0.5;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.01;
    this.marquePourSuppression = false;
  }
  restart() {}
  dessiner(context) {
    context.save();
    context.fillStyle = this.couleur;
    context.beginPath();
    context.arc(this.collisionX, this.collisionY, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
  }
}
export class CompetenceAcquise extends Particule {
  actualiser() {
    this.angle += this.va;
    this.collisionX += Math.cos(this.angle) * this.speedX;
    this.collisionY -= this.speedY;
    if (this.collisionY < -this.radius) {
      this.marquePourSuppression = true;
      this.jeux.deleteElementDeJeux();
    }
  }
}
export class Etincelle extends Particule {
  actualiser() {
    this.angle += this.va * 0.5;
    this.collisionX -= Math.sin(this.angle) * this.speedX;
    this.collisionY -= Math.cos(this.angle) * this.speedY;
    if (this.radius > 0.1) this.radius -= 0.05;
    if (this.radius < 0.2) {
      this.marquePourSuppression = true;
      this.jeux.deleteElementDeJeux();
    }
  }
}
