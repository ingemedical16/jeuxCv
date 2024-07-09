export default class Grenouille {
    constructor(jeux){
        this.jeux = jeux;
        this.image = document.getElementById('grenouille');
        this.spriteWidth = 146;
        this.spriteHeight = 174;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;
        this.x = this.jeux.canvas.width / 2 - this.width / 2;
        this.y = this.jeux.canvas.height - this.height - 40;
        this.moving = false;
        this.jumpX = 0;
        this.frameX = 0;
        this.frameY = 0;
    }
    actualiser(){
        if (this.jeux.keys[38]) {
            //up
            this.frameX = 0;
            if (this.moving === false) {
              this.y -= this.jeux.grid;
              this.moving = true;
            }
          }
          if (this.jeux.keys[40]) {
            //down
            this.frameX = 3;
            if (this.moving === false && this.y < canvas1.height - this.height * 2) {
              this.y += this.jeux.grid;
              this.moving = true;
            }
          }
          if (this.jeux.keys[37]) {
            //left
            this.frameX = 1;
            if (this.moving === false && this.x > this.width) {
              this.x -= this.jeux.grid;
              this.moving = true;
            }
          }
          if (this.jeux.keys[39]) {
            //right
            this.frameX = 2;
            if (this.moving === false && this.x < canvas1.width - this.width * 2) {
              this.x += this.jeux.grid;
              this.moving = true;
            }
          }
          if (this.y < 0) this.jeux.scored();
        }
    
    dessiner(ctx3) {
      
    ctx3.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - 25,
        this.y - 25,
        this.width * 2,
        this.height * 2
      );
    }
    jump() {
        if (this.moving === false) this.frameX += 4;
        else if (this.frameX > 3) this.frameX -= 4;
      }
}