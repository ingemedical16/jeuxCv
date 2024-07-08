import Jeux from "./Jeux.js";

window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1280;
    canvas.height = 720;
    ctx.fillStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.font = " 40px Bangers";
    ctx.textAlign = "center";



  const jeux = new Jeux(canvas);
  jeux.init();
  let lastTime = 0;
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    jeux.render(ctx, deltaTime);

    requestAnimationFrame(animate);
  }
  animate(0);

});