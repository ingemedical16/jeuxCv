/** @type {HTMLCanvasElement} */
export default class Obstacle {
    constructor(jeux,x, y, width, height, speed, type) {
      this.jeux = jeux
        this.image={
        turtle:document.getElementById("turtles"),
        log:document.getElementById("log"),
        car:document.getElementById("cars"),
      };  
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.type = type;
      this.frameX = 0;
      this.frameY = 0;
      this.randomise = Math.floor(Math.random() * 30 + 30);
      this.carType = Math.floor(Math.random() * this.jeux.numberOfCares);
      this.turtleType = Math.floor(Math.random() * 4);
    }
    dessiner(ctx1) {
      if (this.type === "turtle") {
        if (this.jeux.frame % this.randomise === 0) {
          if (this.frameX >= 1) this.frameX = 0;
          else this.frameX++;
        }
        ctx1.drawImage(
          this.image.turtle,
          this.frameX * 70,
          this.turtleType * 70,
          70,
          70,
          this.x,
          this.y,
          this.width,
          this.height
        );
      } else if (this.type === "log") {
        ctx1.drawImage(
          this.image.log,
          0,
          0,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
      } else if (this.type === "car") {
        ctx1.drawImage(
          this.image.car,
          this.speed < 0 ? 160 : 0,
          this.carType * this.height,
          this.width,
          this.height,
          this.x,
          this.y,
          this.width,
          this.height
        );
      }
    }
    actualiser() {
      this.x += this.speed * this.jeux.gameSpeed;
      if (this.speed > 0) {
        if (this.x > this.jeux.canvas.width + this.width) {
          this.x = -this.width;
          this.carType = Math.floor(Math.random() * this.jeux.numberOfCares);
          this.turtleType = Math.floor(Math.random() * 4);
        }
      } else {
        if (this.x < -this.width) {
          this.x = this.jeux.canvas.width + this.width;
        }
      }
    }
  }
  