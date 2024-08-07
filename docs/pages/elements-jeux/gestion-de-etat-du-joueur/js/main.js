import { drawStatusText } from "../../../../assets/js/utils.js";
import Jeux from "./Jeux.js";

window.addEventListener("load", function () {
  const scale = 0.7;
  const loading = document.getElementById("loading");
  loading.style.display = "none";
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight *scale;
  const jeux = new Jeux(canvas);

  var lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    jeux.render(ctx);
    drawStatusText(ctx, jeux.input, jeux.joueur);
    requestAnimationFrame(animate);
  }
  animate(0);
});
