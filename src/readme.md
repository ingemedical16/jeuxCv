# 1 - Technique d’animation de sprite

dans cette partie on va connaître les Technique de animation de spirite, dans premier pas on créer notre fichier html
on mettant link vers notre css et notre main.js.
dans le body une canvas on attribuer l'id 'canvas1' et l'image de sprite , on ajouter une balise select avec des options pour changer l’état de jour.

```html
!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Technique d’animation de sprite</title>
    <link
      rel="stylesheet"
      href="../../../../asset/styles/jeux/technique-animation-sprite/style.css"
    />
  </head>

  <body>
    <canvas id="canvas1"></canvas>
    <img
      src="../../../../asset/img/jeux/technique-animation-sprite/shadow_dog.png"
      alt=""
      id="dogSprite"
    />
    <div class="controls">
      <label for="animations">Choose Animation:</label>
      <select id="animations" name="animations">
        <option value="idle">Idle</option>
        <option value="jump">jump</option>
        <option value="fail">fail</option>
        <option value="run">run</option>
        <option value="dizzy">dizzy</option>
        <option value="sit">sit</option>
        <option value="roll">roll</option>
        <option value="bite">bite</option>
        <option value="ko">KO</option>
        <option value="getHit">Get hit</option>
      </select>
    </div>

    <script
      type="module"
      src="../../../../asset/js/jeux/technique-animation-sprite/main.js"
    ></script>
  </body>
</html>
```

Maintenant, ajoutez quelques css dans le fichier style.css

```css
#canvas1 {
  border: 5px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
}
#dogSprite {
  display: none;
}

.controls {
  position: absolute;
  z-index: 10;
  top: 50px;
  left: 50%;
  /* center horyzontally */
  transform: translateX(-50%);
}

.controls,
select,
option {
  font-size: 25px;
}
```
maintenant j’ajoute 3 fichiers, le premier pour la class Jeux, le second pour la class Joueur, et le main.js
```js
export class Joueur {
  constructor(jeux) {
    this.jeux = jeux;
    this.image = document.getElementById("dogSprite");
    this.spriteWidth = 575;
    this.spriteHeight = 523;
    this.frameX = 0;
    this.frameY = 0;
  }
  dessiner(context) {
  
    context.drawImage(
      this.image,
      this.frameX,
      this.frameY,
      this.spriteWidth,
      this.spriteHeight,
      0,
      0,
      this.jeux.canvas.width,
      this.jeux.canvas.height
    );
  }
  actualiser() {
    let position =
      Math.floor(this.jeux.gameFrame / this.jeux.staggerFrames) %
      this.jeux.spriteAnimations[this.jeux.playerState].loc.length;

    this.frameX = this.spriteWidth * position;
    this.frameY =
      this.jeux.spriteAnimations[this.jeux.playerState].loc[position].y;
  }
}
```
```js
import { dogAnimationStates } from "../../../../static/db.js";
import { Joueur } from "./joueur.js";
export default class Jeux {
  constructor(canvas) {
    this.canvas = canvas;
    this.playerState = "fail";
    this.dropdown = document.getElementById("animations");
    this.gameFrame = 0;
    this.staggerFrames = 3;
    this.spriteAnimations = [];
    this.animationStates = dogAnimationStates;
    this.joueur = new Joueur(this);

    // events
    this.dropdown.addEventListener("change", (e) => {
      this.playerState = e.target.value;
    });
  }
  restart() {}
  render(context, deltaTime) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.joueur.dessiner(context);
    this.joueur.actualiser();
  }
  init() {
    this.animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      };
      for (let j = 0; j < state.frames; j++) {
        let positionX = j * this.joueur.spriteWidth;
        let positionY = index * this.joueur.spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
      }
      this.spriteAnimations[state.name] = frames;
    });
  }
}

```
```js
import Jeux from "./Jeux.js";
window.addEventListener("load", function () {
  // global variable
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 600;
  //autre variable


  const jeux = new Jeux(canvas);
  jeux.init();

  // animation de jeux
  let lastTime = 0;
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
   
    jeux.render(ctx, deltaTime);
    jeux.gameFrame++;
    requestAnimationFrame(animate);
  }
  animate(0);
});
```
# 2 - les Animation des enemies 
pour ces animation on va utiliser les mouvement sinusoïdal sur l'axe x et y avec la formule A * sin(angle * t)et A * cos(angle * t) on jou avec les paramètre pour obtenue  de movement intéressant de façon uniforme.
on commence avec le fichier html
```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Technique d’animation de sprite</title>
    <link
      rel="stylesheet"
      href="../../../../asset/styles/jeux/animation-des-enemies/style.css"
    />
  </head>

  <body>
    <div class="container__canvas">
    <canvas id="canvas1"></canvas>
    <canvas id="canvas2"></canvas>
    <canvas id="canvas3"></canvas>
    <canvas id="canvas4"></canvas>
  </div>
    <img
      src="../../../../asset/img/jeux/animation-des-enemies/enemy1.png"
      alt="enemy1"
      id="enemy1"
    />
    <img
      src="../../../../asset/img/jeux/animation-des-enemies/enemy2.png"
      alt="enemy2"
      id="enemy2"
    />
    <img
      src="../../../../asset/img/jeux/animation-des-enemies/enemy3.png"
      alt="enemy3"
      id="enemy3"
    />
    <img
      src="../../../../asset/img/jeux/animation-des-enemies/enemy4.png"
      alt="enemy4"
      id="enemy4"
    />
    

    <script
      type="module"
      src="../../../../asset/js/jeux/animation-des-enemies/main.js"
    ></script>
  </body>
</html>
```
quelques styles sur notre projet
```css
.container__canvas {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content:space-around;
  flex-wrap: wrap;
}

#canvas1,
#canvas2,
#canvas3,
#canvas4 {
  border: 3px solid black;
  height: 700px;
  width: 500px;
  margin: 20px;
}

#enemy1,
#enemy2,
#enemy3,
#enemy4 {
  display: none;
}

```
# 3 - Parallax

dans cette partie on define une class Layer qui gère les mouvement des  backgrounds le principe de cette effect que on divise background a plusieurs layer chaque layer a lor prop vitesse qui depend de vitesse de jeux,donc  on define cette class Layer.js pour chaque layer
```js
export default class Layer {
    constructor(image, speedModifier, gameSpeed) {
      this.image = image;
      this.speedModifier = speedModifier;
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 720;
      this.gameSpeed =gameSpeed

      this.speed = this.gameSpeed * this.speedModifier;
    }

    actualiser() {
      this.speed = this.gameSpeed * this.speedModifier;

      if (this.x <= -this.width) {
        this.x = 0;
      }

      this.x = Math.floor(this.x - this.speed);
    }

    dessiner(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }
```
# 4 - Gestion de l'état du joueur
On va voir dans cette section les technique de gestion d’état de Jour, dans ce projet on va utilisé   une class avec deux listener 'keydown' et 'keyup' cette class va manipuler les saisir de utilisateur dans un seul variable 'lastkey' press ou release.
```js
  import { KEYEVENT } from "./utils.js";
export default class InputHandler {
  constructor() {
    this.lastKey = "";

    window.addEventListener("keydown", (e) => {
      console.log(this.lastKey);
      switch (e.key) {
        case "ArrowRight":
          this.lastKey = KEYEVENT.PRESS_RIGHT;
          break;
        case "ArrowLeft":
          this.lastKey = KEYEVENT.PRESS_LEFT;
          break;
        case "ArrowUp":
          this.lastKey = KEYEVENT.PRESS_UP;
          break;
        case "ArrowDown":
          this.lastKey = KEYEVENT.PRESS_DOWN;
          break;
        case "Enter":
          this.lastKey = KEYEVENT.PRESS_ENTER;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
        console.log(this.lastKey);
      switch (e.key) {
        case "ArrowRight":
          this.lastKey = KEYEVENT.RELEASE_RIGHT;
          break;
        case "ArrowLeft":
          this.lastKey = KEYEVENT.RELEASE_LEFT;
          break;
        case "ArrowUp":
          this.lastKey = KEYEVENT.RELEASE_UP;
          break;
        case "ArrowDown":
          this.lastKey = KEYEVENT.RELEASE_DOWN;
          break;
        case "Enter":
          this.lastKey = KEYEVENT.RELEASE_ENTER;
          break;
      }
    });
  }
}
```
dans cette partie on va voir quelque principe de programmation orient object
# 5 - principes of object Oriented programming:
## 1- Encapsulation 
can be used to protect our data from unwanted outside access, it simplifies maintenance of our code by keeping it organises and easier to understand.

#### 
--> extends keyword is used to create a child class (sub class) extending classes is good example of one of four pillars of object-oriented programming called inheritance:

## 2- Inheritance
is a process where one class inherits attributes and methods from another class. we use it to avoid code repetition, you can use super keyword in child classes to access and call methods on Object parent une super is used in a constructor like:
```JavaScript
class supClass extends parentClass {
    constructor(arg){
        super(arg_forParant)
    }
}
```
      ```JS
        class State {
  // Parent class also called "super class"
  constructor(state) {
    this.state = state;
  }
}

                class StandingLeft extends State {
                //child class also called "sub class"
                constructor(player) {
                    super("STANDING LEFT");
                    this.player = player;
                }
 1 ----->        enter(){}
2---------->     handleInput(){}
                }

            class StandingRight extends State {
                //child class also called "sub class"
                constructor(player) {
                super("STANDING RIGHT");
                this.player = player;
                }
1 ------>        enter(){}
2 ---------->    handleInput(){}
            }
      ```

wheen the methods named exactly the same this is very important: placing methods with the same names on different objects is an example of one of the core concepts de object-oriented programming call polymorphism:

## 3- Polymorphism

out of this for concepts it's the most complex one  to fully understand since it has multiple types in this case:
Polymorphism allows methods to display different behaviors depending on which class calls it.

# 6 - collision deux rectangle
```js
let rect1 = {
  x: 5,
  y: 20,
  width: 100,
  height: 100,
};
let rect2 = {
  x: 20,
  y: 20,
  width: 50,
  height: 50,
};
// check collision first
if (
  rect1.x < rect2.x + rect2.width &&
  rect1.x + rect1.width > rect2.x &&
  rect1.y < rect2.yv + rect2.height &&
  rect1.y + rect1.height > rect2.y
) {
  //collision detected
} else {
  // no collision detected
}

if (
  rect1.x > rect2.x + rect2.width ||
  rect1.x + rect1.width < rect2.x ||
  rect1.y > rect2.yv + rect2.height ||
  rect1.y + rect1.height < rect2.y
) {
  // no collision detected
} else {
  //collision detected
}

```
# 7 - Example jeu  Genouillé.
dans cette jeux l'objectif de applique la verifications  de collision en effet notre grenouille doit passe a l'autre coûte sans collision avec les voiture et sans tombe dans l'eau. 

# 8 - Example jeu Blue
le jeu c'est enivrement a des obstacles qui place aléatoirement. des oeufs qui va place aléatoirement de façon periodique avec un nombre limit, chaque œuf éclot en 5 secondes et donne naissance à un Grand ou compétence qui va vole
dans cette jeu on va donne a notre elements de jeux  caractéristiques soumis a de loi des physiques, exemple un 
 - obstacle le joueur et les emmies ne peut pas dépassé physiquement,il va evite Automatiquement.
 - les oeufs  est un obstacle qui pe déplace a la collision avec le joueur ou les enemies
 - les enemies peu déplace par le joueur
 - les nouveau nee peut-il mangier par les enemies
 pour ce demo j'ai set le score gagnant 30, puis le program évolue combiner des  competence perdu si  plus de 5 c'est perdant si non gagnant.                                                      
