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
