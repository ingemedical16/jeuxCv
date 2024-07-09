
export class Enemy1 {
  constructor(jeux) {
    this.jeux = jeux;
    this.image =  document.getElementById('enemy1')
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (this.jeux.canvas.width - this.width);
    this.y = Math.random() * (this.jeux.canvas.height - this.height);
    //this.speed = Math.random() * 4 - 2;

    this.frameX = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  actualiser(){
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    if (this.jeux.gameFrame % this.flapSpeed === 0) {
      this.frameX > 4 ? (this.frameX = 0) : this.frameX++;
    }
  }
  dessiner(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
export class Enemy2 {
  constructor(jeux) {
    this.jeux = jeux;
    this.image =  document.getElementById('enemy2')
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (this.jeux.canvas.width - this.width);
    this.y = Math.random() * (this.jeux.canvas.height - this.height);
    this.speed = Math.random() * 4 + 1;
    this.frameX = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }
  actualiser(){
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = this.jeux.canvas.width;
    if (this.jeux.gameFrame % this.flapSpeed === 0) {
      this.frameX > 4 ? (this.frameX = 0) : this.frameX++;
    }
  }
  dessiner(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
export class Enemy3 {
  constructor(jeux) {
    this.jeux = jeux;
    this.image =  document.getElementById('enemy3')
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (this.jeux.canvas.width - this.width);
    this.y = Math.random() * (this.jeux.canvas.height - this.height);
    this.speed = Math.random() * 4 + 1;
    this.frameX = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 500;
    this.angleSpeed = Math.random() * 0.5 + 0.5;
    //this.curve = Math.random() * 200 + 50;
  }
  actualiser(){
    this.x =
      (this.jeux.canvas.width / 2) * Math.cos((this.angle * Math.PI) / 90) +
      this.jeux.canvas.width / 2 -
      this.width / 2;
    this.y =
      (this.jeux.canvas.height / 2) * Math.sin((this.angle * Math.PI) / 270) +
      this.jeux.canvas.width / 2 -
      this.width / 2;
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = this.jeux.canvas.width;
    if (this.jeux.gameFrame % this.flapSpeed === 0) {
      this.frameX > 4 ? (this.frameX = 0) : this.frameX++;
    }
  }
  dessiner(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
export class Enemy4 {
  constructor(jeux) {
    this.jeux = jeux;
    this.image =  document.getElementById('enemy4')
    this.spriteWidth = 213;
    this.spriteHeight = 213;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (this.jeux.canvas.width - this.width);
    this.y = Math.random() * (this.jeux.canvas.height - this.height);
    this.newX = Math.random() * this.jeux.canvas.width;
    this.newY = Math.random() * this.jeux.canvas.height;
    this.speed = Math.random() * 4 + 1;
    this.frameX = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }
  actualiser(){
    if (this.jeux.gameFrame % 60 === 0) {
      this.newX = Math.random() * (this.jeux.canvas.width - this.width);
      this.newY = Math.random() * (this.jeux.canvas.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 70;
    this.y -= dy / 70;

    if (this.x + this.width < 0) this.x = this.jeux.canvas.width;
    if (this.jeux.gameFrame % this.flapSpeed === 0) {
      this.frameX > 4 ? (this.frameX = 0) : this.frameX++;
    }
  }
  dessiner(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
