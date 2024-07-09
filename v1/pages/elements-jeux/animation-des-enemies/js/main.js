import Jeux from "./Jeux.js";
window.addEventListener("load", function () {
  // global variable
    const canvas1 = document.getElementById("canvas1");
    const ctx1 = canvas1.getContext("2d");
    canvas1.width = 500;
    canvas1.height = 700;
    const canvas2 = document.getElementById("canvas2");
    const ctx2 = canvas2.getContext("2d");
    canvas2.width = 500;
    canvas2.height = 700;
    const canvas3 = document.getElementById("canvas3");
    const ctx3 = canvas3.getContext("2d");
    canvas3.width = 500;
    canvas3.height = 700;
    const canvas4 = document.getElementById("canvas4");
    const ctx4 = canvas4.getContext("2d");
    canvas4.width = 500;
    canvas4.height = 700;
  //autre variable
  const contextsArray = [ctx1,ctx2,ctx3,ctx4] ;

  const jeux = new Jeux(canvas1);
  jeux.init();

  // animation de jeux
  let lastTime = 0;
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
   contextsArray.forEach(ctx =>{
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
   })
    jeux.enemies1.forEach(enemy =>{
      enemy.actualiser();
      enemy.dessiner(ctx1);
    });
    jeux.enemies2.forEach(enemy =>{
      enemy.actualiser();
      enemy.dessiner(ctx2);
    })
    jeux.enemies3.forEach(enemy =>{
      enemy.actualiser();
      enemy.dessiner(ctx3);
    })
    jeux.enemies4.forEach(enemy =>{
      enemy.actualiser();
      enemy.dessiner(ctx4);
    })
    jeux.gameFrame++;
    requestAnimationFrame(animate);
  }
  animate(0);
});
