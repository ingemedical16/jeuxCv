import Layer from "./Layer.js";
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

  

  slider.value = gameSpeed;
  showGameSpeed.innerHTML = gameSpeed;
  slider.addEventListener("change", function (e) {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
  });
  const layers = [
    new Layer(backgroundLayer1, 0.2,gameSpeed),
    new Layer(backgroundLayer2, 0.4,gameSpeed),
    new Layer(backgroundLayer3, 0.6,gameSpeed),
    new Layer(backgroundLayer4, 0.8,gameSpeed),
    new Layer(backgroundLayer5, 1,gameSpeed),
  ];
  // animation de jeux
  let lastTime = 0;
  function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
   
  
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layers.forEach((layer) => {
      layer.actualiser();
      layer.dessiner(ctx);
    });
  
    
    requestAnimationFrame(animate);
  }
  animate(0);
});
