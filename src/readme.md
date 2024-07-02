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