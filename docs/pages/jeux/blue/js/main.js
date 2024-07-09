import Jeux from "./Jeux.js";

window.addEventListener("load", function () {
  const showHelp = ()=>{
    $('#help_container').show()
  } 
  const hideHelp = ()=>{
    $('#help_container').hide()
  } 
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1280;
    canvas.height = 720;
    ctx.fillStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.font = " 40px Bangers";
    ctx.textAlign = "center";

   // $('#help_container').hide()
   

  const jeux = new Jeux(canvas);
  jeux.init();
  let lastTime = 0;
  $('#help_close').click(function(){
    hideHelp();
    jeux.restart();
  });
  $('#infoBtn').click(function(e){
    showHelp();
  })

  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    jeux.render(ctx, deltaTime);

    requestAnimationFrame(animate);
  }
  animate(0);

});