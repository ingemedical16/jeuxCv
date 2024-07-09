class ParticleParant {
  constructor(x, y) {
    this.x = x + 25;
    this.y = y + 25;
    this.radius = Math.random() * 20 + 1;
    this.opacity = 1;
    this.directionX = Math.random() * 1 - 0.5;
    this.directionY = Math.random() * 1 - 0.5;
  }
}

export class Particle extends ParticleParant {
  constructor(x, y) {
    super(x, y);
  }
  dessiner(ctx3) {
    
    ctx3.fillStyle = "rgba(150,150,150," + this.opacity + ")";
    ctx3.beginPath();
    ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx3.fill();
    ctx3.closePath();
  }
  actualiser() {
    this.x += this.directionX;
    this.y += this.directionY;
    if (this.opacity > 0.1) {
      this.opacity -= 0.9;
    }
    if (this.radius > 0.15) {
      this.radius - 0.9;
    }
  }
}

export class Ondulation extends ParticleParant {
  constructor(x, y) {
    super(x, y);
  }
  dessiner(ctx1) {
    ctx1.strokeStyle = "rgba(255,255,255," + this.opacity + ")";
    ctx1.beginPath();
    ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx1.stroke();
    ctx1.closePath();
  }
  actualiser() {
    if (this.radius < 50) {
      this.radius += 0.7;
      this.x -= 0.03;
      this.y -= 0.03;
    }
    if (this.opacity > 0) {
      this.opacity -= 0.02;
    }
  }
}
