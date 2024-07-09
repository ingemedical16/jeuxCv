import Layer from "./Layer.js";
import Jeux  from "./jeux.js";
window.addEventListener("load", function () {
  // global variable
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = (canvas.width = 800);
  const CANVAS_HEIGHT = (canvas.height = 700);
  //autre variable
  const slider = document.getElementById("slider");
  const showGameSpeed = document.getElementById("showGameSpeed");
  let gameSpeed = 10;

  const backgroundLayer1 = document.getElementById('layer1')
  const backgroundLayer2 = document.getElementById('layer2')
  const backgroundLayer3 = document.getElementById('layer3')
  const backgroundLayer4 = document.getElementById('layer4')
  const backgroundLayer5 = document.getElementById('layer5')
  const layers = [
    {image:backgroundLayer1, v:0.2},
    {image:backgroundLayer2, v:0.4},
    {image:backgroundLayer3, v:0.6},
    {image:backgroundLayer4, v:0.8},
    {image:backgroundLayer5, v:1},
  ];
  const jeux = new Jeux(canvas,layers);

  

  slider.value = gameSpeed;
  showGameSpeed.innerHTML = gameSpeed;
  slider.addEventListener("change", function (e) {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
  });
  jeux.init()
  
  // animation de jeux
  let lastTime = 0;
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    jeux.gameSpeed = gameSpeed;
    
  
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    jeux.render(ctx);
  
    requestAnimationFrame(animate);
  }
  animate(0);
});
