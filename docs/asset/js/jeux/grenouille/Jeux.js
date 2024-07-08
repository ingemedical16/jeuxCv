import Grenouille from "./grenouille.js";
import Obstacle from "./obstacles.js";
import { Ondulation, Particle } from "./particles.js";
import { collision } from "../../utils.js";

export default class Jeux {
  constructor(canvas) {
    this.canvas = canvas;
    this.grid = 80;
    this.keys = [];
    this.score = 0;
    this.collisionCount = 0;
    this.frame = 0;
    this.gameSpeed = 1;
    this.particlesArray = [];
    this.maxParticles = 300;
    this.ondulationArray = [];
    this.carsArray = [];
    this.logsArray = [];
    this.numberOfCares = 3;
    this.safe = false;
    this.grenouille = new Grenouille(this);
    this.collisionsImage = document.getElementById("collisions");
    // event listeners
    window.addEventListener("keydown", (e) => {
      this.keys[e.keyCode] = true;
      if (this.keys[37] || this.keys[38] || this.keys[39] || this.keys[40]) {
        this.grenouille.jump();
      }
    });

    window.addEventListener("keyup", (e) => {
      delete this.keys[e.keyCode];
      this.grenouille.moving = false;
    });
  }
  scored() {
    this.score++;
    this.gameSpeed += 0.05;
    this.grenouille.x = this.canvas.width / 2 - this.grenouille.width / 2;
    this.grenouille.y = this.canvas.height - this.grenouille.height - 40;
  }
  handleScoreBoard(ctx4) {
    ctx4.fillStyle = "black";
    ctx4.strokeStyle = "black";
    ctx4.font = "15px Verdana";
    ctx4.strokeText("Score", 265, 15);
    ctx4.font = "60px Verdana";
    ctx4.fillText(this.score, 270, 75);
    ctx4.font = "15px Verdana";
    ctx4.strokeText("Collisions: " + this.collisionCount, 10, 175);
    ctx4.strokeText("Game Speed: " + this.gameSpeed.toFixed(1), 10, 195);
  }
  resetJeux() {
    this.collisionCount++;
    this.gameSpeed = 1;
    this.grenouille.x = this.canvas.width / 2 - this.grenouille.width / 2;
    this.grenouille.y = this.canvas.height - this.grenouille.height - 40;
    this.collisionCount++;
    this.gameSpeed = 1;
    this.score = 0;
  }

  init() {
    //lane 1
    for (let i = 0; i < 2; i++) {
      let x = i * 350;
      this.carsArray.push(
        new Obstacle(
          this,
          x,
          this.canvas.height - this.grid * 2 - 20,
          this.grid * 2,
          this.grid,
          1,
          "car"
        )
      );
    }
    //lane 2
    for (let i = 0; i < 2; i++) {
      let x = i * 300;
      this.carsArray.push(
        new Obstacle(
          this,
          x,
          this.canvas.height - this.grid * 3 - 20,
          this.grid * 2,
          this.grid,
          -2,
          "car"
        )
      );
    }
    //lane 3
    for (let i = 0; i < 2; i++) {
      let x = i * 400;
      this.carsArray.push(
        new Obstacle(
          this,
          x,
          this.canvas.height - this.grid * 4 - 20,
          this.grid * 2,
          this.grid,
          2,
          "car"
        )
      );
    }
    //lane 4
    for (let i = 0; i < 2; i++) {
      let x = i * 400;
      this.logsArray.push(
        new Obstacle(
          this,
          x,
          this.canvas.height - this.grid * 5 - 20,
          this.grid * 2,
          this.grid,
          -2,
          "log"
        )
      );
    }
    for (let i = 0; i < 3; i++) {
      let x = i * 200;
      this.logsArray.push(
        new Obstacle(
          this,
          x,
          this.canvas.height - this.grid * 6 - 20,
          this.grid,
          this.grid,
          2,
          "turtle"
        )
      );
    }
  }

  handelerObstacles(ctx1, ctx4) {
    const obstaclesArray = [...this.logsArray, ...this.carsArray];
    obstaclesArray.forEach((obstacle) => {
      obstacle.dessiner(ctx1);
      obstacle.actualiser();
    });
    // collision with car
    for (let i = 0; i < this.carsArray.length; i++) {
      if (collision(this.grenouille, this.carsArray[i])) {
        ctx4.drawImage(
          this.collisionsImage,
          0,
          100,
          100,
          100,
          this.grenouille.x,
          this.grenouille.y,
          50,
          50
        );
        this.resetJeux();
      }
    }
    // collision with logs/turtles
    if (this.grenouille.y < 250 && this.grenouille.y > 100) {
      this.safe = false;

      for (let i = 0; i < this.logsArray.length; i++) {
        let unit_x = this.logsArray[i].type === "log" ? 70 : 40;
        if (collision(this.grenouille, this.logsArray[i])) {
          let dx = this.grenouille.x - this.logsArray[i].x;

          this.grenouille.x += this.logsArray[i].speed - dx + unit_x;
          this.safe = true;
        }
      }
      if (!this.safe) {
        for (let i = 0; i < 30; i++) {
          this.ondulationArray.unshift(
            new Ondulation(this.grenouille.x, this.grenouille.y)
          );
        }
        ctx4.drawImage(
          this.collisionsImage,
          0,
          0,
          100,
          100,
          this.grenouille.x,
          this.grenouille.y,
          50,
          50
        );
        this.resetJeux();
      }
    }
  }

  handelerParticules(ctx3) {
    this.particlesArray.forEach((particule) => {
      particule.actualiser();
      particule.dessiner(ctx3);
    });
    //dust
    if (this.particlesArray.length > this.maxParticles) {
      for (let i = 0; i < 30; i++) {
        this.particlesArray.pop();
      }
    }
    if (
      (this.keys[37] || this.keys[38] || this.keys[39] || this.keys[40]) &&
      this.grenouille.y > 250 &&
      this.particlesArray.length < this.maxParticles + 10
    ) {
      for (let i = 0; i < 10; i++) {
        this.particlesArray.unshift(
          new Particle(this.grenouille.x, this.grenouille.y)
        );
      }
    }
  }
  handelerOndulation(ctx1) {
    //water ondulation

    this.ondulationArray.forEach((ondes) => {
      ondes.actualiser();
      ondes.dessiner(ctx1);
    });

    if (this.ondulationArray.length > 20) {
      for (let i = 0; i < 5; i++) {
        this.ondulationArray.pop();
      }
    }
    if (
      (this.keys[37] || this.keys[38] || this.keys[39] || this.keys[40]) &&
      this.grenouille.y < 250 &&
      this.grenouille.y > 90
    ) {
      for (let i = 0; i < 20; i++) {
        this.ondulationArray.unshift(
          new Ondulation(this.grenouille.x, this.grenouille.y)
        );
      }
    }
  }
}
