# Présentation
Cet atelier consistera dans la réalisation d’un site internet présentant son C.V. à travers un jeu.

# Description
##     Principe 
réalisation d'un jeu en JavaScript. Quand l’utilisateur aura atteint un niveau que vous aurez déterminé, il pourra accéder à mon C.V. et autres pages du site (coordonnées, contact…). La possibilité sera laissée à l’utilisateur d’accéder
directement à mon CV sans jouer.

# Architecture  de cette atelier
 
Dans ce atelier on va organiser mon espace de travaille conforme L'arborescence suivent:
```
|- readme.md
|- src|-index.html
|     |- asset |- img   |- cvs -> les images de cvs
|     |        |-       |- jeux -> les images des jeux
|     |        |- js    |- utils.js
|     |        |        |- main.js
|     |        |        |- cvs -> cvs -> les fichier de javaScript pour cvs
|     |        |        |- jeux -> les fichier de javaScripte pour les jeux
|     |        |        |- pdf -> les fichier pdf cvs et autre
|     |        |- styles|- cvs -> les fichier styles de cvs
|     |        |        |- jeux -> les fichier styles des jeux
|     |        |        |- style.css
|     |- pages |-cvs
|     |        |-jeux
|     |-static |-db.js
_______________________________________________________________________________________________________

```
On commence de planifier les element qui va entre dans notre jeux. En effet j'ai utiliser les class, et j'ai modélise mon travailler ce pour cela j'ai utiliser la balise script type='module'.
```html
<script type="module" src="path/fichier.js"></script>
```
Alors on commence de crées les element de jeux on va garde cette structure  dans chaque element
```js
export class ElementDeJeux {
    constructor(jeux){
        this.jeux =jeux
        propretéElement;
    }
    dessiner(context) {};
     actualiser() {}
}
export class Jeux{
    constructor(canvas,..args){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        ...
        // on gère les events dans le constructor ou dans un class sépare
        canvas.addEventListener("mousedown", (e) => {
             ..................
      });
      canvas.addEventListener("mouseup", (e) => {
        ........
      });
      canvas.addEventListener("mousemove", (e) => {
        
    }

    
}
    restart() {
    render(context, deltaTime) {};
    init() {};
}
```
On va importe l'element et le jeux dans main.js.
```js
import {...elements} from 'path/elements.js'.
import Jeux from 'path/jeux.js'

window.addEventListener("load", function () {

    // global variable
    const canvas = document.getElementById("canvas1");
        const ctx = canvas.getContext("2d");
        canvas.width = 'valeur';
        canvas.height = 'valeur';
        //autre variable

    
  const jeux = new Jeux(canvas);
  jeux.init();

  // animation de jeux
  let lastTime = 0;
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    jeux.render(ctx, deltaTime);

    requestAnimationFrame(animate);
  }
  animate(0);
});
```