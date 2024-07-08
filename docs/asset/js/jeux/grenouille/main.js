import Jeux from "./Jeux.js";

window.addEventListener("load", function () {
  // images
  const background_lv12Image = document.getElementById("background_lvl2");
  const grassImage = document.getElementById("grass");
  


  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 600;
  const canvas1 = document.getElementById("canvas1");
  const canvas2 = document.getElementById("canvas2");
  const canvas3 = document.getElementById("canvas3");
  const canvas4 = document.getElementById("canvas4");
  const canvas5 = document.getElementById("canvas5");
  const ctx1 = canvas1.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  const ctx3 = canvas3.getContext("2d");
  const ctx4 = canvas4.getContext("2d");
  const ctx5 = canvas5.getContext("2d");
  const contextArray = [ctx1, ctx2, ctx3, ctx4, ctx5];
  canvas1.width = CANVAS_WIDTH;
  canvas1.height = CANVAS_HEIGHT;
  canvas2.width = CANVAS_WIDTH;
  canvas2.height = CANVAS_HEIGHT;
  canvas3.width = CANVAS_WIDTH;
  canvas3.height = CANVAS_HEIGHT;
  canvas4.width = CANVAS_WIDTH;
  canvas4.height = CANVAS_HEIGHT;
  canvas5.width = CANVAS_WIDTH;
  canvas5.height = CANVAS_HEIGHT;

  const jeux = new Jeux(canvas4);
  jeux.init();

  var lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    contextArray.forEach((context) => {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      });

    jeux.handelerOndulation(ctx1);
    ctx1.drawImage(background_lv12Image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    jeux.handelerParticules(ctx3);
    jeux.grenouille.dessiner(ctx3);
    jeux.grenouille.actualiser();
    
    jeux.handelerObstacles(ctx1,ctx4);
    jeux.handleScoreBoard(ctx4);
    ctx4.drawImage(grassImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    jeux.frame++;
    requestAnimationFrame(animate);
  }
  animate(0);
});
