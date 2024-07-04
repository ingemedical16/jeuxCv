import { dynamicSort } from "../../utils.js";
import Enemy from "./Enemy.js";
import Joueur from "./Joueur.js";
import Obstacle from "./Obstacle.js";
import Oeuf from "./Oeuf.js";

export default class Jeux {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.marginTop = 260;
      this.debug = false;
      this.joueur = new Joueur(this);
      this.fps = 70;
      this.timer = 0;
      this.interval = 1000 / this.fps;
      this.oeufTimer = 0;
      this.oeufInterval = 1000;
      this.nombreDObstacles = 5;
      this.obstacles = [];
      this.oeufs = [];
      this.enemies = [];
      this.nouveauNes = [];
      this.particules = [];
      this.competencesPerdu = 0;
      this.score = 0;
      this.scoreGagnant = 30;
      this.jeuTermine = false;

      this.elements = [
        this.joueur,
        ...this.obstacles,
        ...this.oeufs,
        ...this.enemies,
        ...this.nouveauNes,
        ...this.particules,
      ];
      this.maxOeufs = 5;
      this.souris = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        presse: false,
      };

      canvas.addEventListener("mousedown", (e) => {
        this.souris.x = e.offsetX;
        this.souris.y = e.offsetY;
        this.souris.presse = true;
      });
      canvas.addEventListener("mouseup", (e) => {
        this.souris.x = e.offsetX;
        this.souris.y = e.offsetY;
        this.souris.presse = false;
      });
      canvas.addEventListener("mousemove", (e) => {
        if (this.souris.presse) {
          this.souris.x = e.offsetX;
          this.souris.y = e.offsetY;
        }
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "d" || e.key === "D") this.debug = !this.debug;
        else if (e.key === "r" || e.key === "R") this.restart();
      });
    }
    deleteElementDeJeux() {
      this.oeufs = this.oeufs.filter((o) => !o.marquePourSuppression);
      this.nouveauNes = this.nouveauNes.filter((o) => !o.marquePourSuppression);
      this.particules = this.particules.filter((o) => !o.marquePourSuppression);
    }

    render(context, deltaTime) {
      if (this.timer > this.interval) {
        context.clearRect(0, 0, this.width, this.height);
        // animate next frame
        this.elements = [
          this.joueur,
          ...this.obstacles,
          ...this.oeufs,
          ...this.enemies,
          ...this.nouveauNes,
          ...this.particules,
        ];
        this.elements.sort(dynamicSort("collisionY"));
        this.elements.forEach((el) => {
          el.dessiner(context);
          el.actualiser(deltaTime);
        });

        // rester timer
        this.timer = 0;
      }
      this.timer += deltaTime;
      //Ajouter des oeufs périodiquement
      if (
        this.oeufTimer > this.oeufInterval &&
        this.oeufs.length < this.maxOeufs &&
        !this.jeuTermine
      ) {
        this.ajouterElement("oeuf");
        this.oeufTimer = 0;
      } else {
        this.oeufTimer += deltaTime;
      }
      // dessines le text de status
      context.save();
      context.textAlign = "left";
      context.fillText(`Score: ${this.score}`, 25, 50);
      if (this.debug) {
        context.fillText(`Perdu: ${this.competencesPerdu}`, 25, 90);
      }
      context.restore();
      // le score gagnant
      if (this.score >= this.scoreGagnant) {
        this.jeuTermine = true;
        context.save();
        context.fillStyle = "rgba(0,0,0,0.5)";
        context.fillRect(0, 0, this.width, this.height);
        context.fillStyle = "#ffffff";
        context.textAlign = "center";
        context.shadowOffsetX = 4;
        context.shadowOffsetY = 4;
        context.shadowColor = "black";
        let message1;
        let message2;
        let message3 = null;
        if (this.competencesPerdu <= 5) {
          // gagnant message
          message1 = "Compétences acquises!!";
          message2 = "Apprendre à apprendre est la clé du succès";
        } else {
          // perdu message
          message1 = "L'échec, premier pas vers la réussite";
          message2 = `vous avez perdu ${this.competencesPerdu} compétences!
        `;
          message3 =
            "Celui qui tombe et se relève, est bien plus fort que celui qui ne tombe jamais!";
        }
        context.font = "60px Bangers";
        context.fillText(message1, this.width * 0.5, this.height * 0.5);
        context.font = "30px Bangers";
        context.fillText(message2, this.width * 0.5, this.height * 0.5 + 50);
        message3 &&
          context.fillText(message3, this.width * 0.5, this.height * 0.5 + 80);
        context.fillText(
          `Dernière score: ${this.score}. Appuyez sur « R » pour rejouer !`,
          this.width * 0.5,
          this.height * 0.5 + 120
        );

        context.restore();
      }
    }

    checkCollision(a, b) {
      const dx = a.collisionX - b.collisionX;
      const dy = a.collisionY - b.collisionY;
      const distance = Math.hypot(dy, dx);
      const sommeDesRayons = a.collisionRadius + b.collisionRadius;
      const isCollision = distance < sommeDesRayons;
      return [isCollision, distance, sommeDesRayons, dx, dy];
    }
    ajouterElement(type) {
      if (type === "oeuf") this.oeufs.push(new Oeuf(this));
      if (type === "enemy") this.enemies.push(new Enemy(this));
    }
    restart() {
      // animate next frame
      this.joueur.restart();
      this.obstacles = [];
      this.oeufs = [];
      this.enemies = [];
      this.nouveauNes = [];
      this.particules = [];
      this.souris = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        presse: false,
      };
      this.jeuTermine = false;
      this.score = 0;
      this.competencesPerdu = 0;
      this.init();
    }
    init() {
      for (let i = 0; i < 5; i++) {
        this.ajouterElement("enemy");
      }
      let tentatives = 0;
      while (
        this.obstacles.length < this.nombreDObstacles &&
        tentatives < 500
      ) {
        let testObstacle = new Obstacle(this);
        let chevauchement = false;
        this.obstacles.forEach((obstacle) => {
          const dx = testObstacle.collisionX - obstacle.collisionX;
          const dy = testObstacle.collisionY - obstacle.collisionY;
          const distance = Math.hypot(dy, dx);
          const distanceBuffer = 150;
          const sommeDesRayons =
            testObstacle.collisionRadius + obstacle.collisionRadius;
          if (distance < sommeDesRayons) {
            chevauchement = true;
          }
        });
        const margin = testObstacle.collisionRadius * 3;
        if (
          !chevauchement &&
          testObstacle.spriteX > 0 &&
          testObstacle.spriteX < this.width - testObstacle.width &&
          testObstacle.collisionY > this.marginTop + margin &&
          testObstacle.collisionY < this.height - margin
        ) {
          this.obstacles.push(testObstacle);
        }
        tentatives++;
      }
    }
  }