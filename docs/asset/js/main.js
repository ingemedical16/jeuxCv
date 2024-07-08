
window.addEventListener('load',function(){

var currentFig = 1;
var currentDeg = 0;

  $('#next').click(function(){
    $('#fig'+currentFig).removeClass('show');
    currentFig++;
    if(currentFig>8){
      currentFig=1;
    }
    currentDeg-=45;
    $('#fig'+currentFig).addClass('show');
    $('.carousel').css({
      "-webkit-transform": "rotateY("+currentDeg+"deg)",
      "-moz-transform": "rotateY("+currentDeg+"deg)",
      "-ms-transform": "rotateY("+currentDeg+"deg)",
      "-o-transform": "rotateY("+currentDeg+"deg)",
      "transform": "rotateY("+currentDeg+"deg)"
    });
  });

  $('#prev').click(function(){
    $('#fig'+currentFig).removeClass('show');
    currentFig--;
    if(currentFig<1){
      currentFig=8;
    }
    currentDeg+=45;
    $('#fig'+currentFig).addClass('show');
    $('.carousel').css({
      "-webkit-transform": "rotateY("+currentDeg+"deg)",
      "-moz-transform": "rotateY("+currentDeg+"deg)",
      "-ms-transform": "rotateY("+currentDeg+"deg)",
      "-o-transform": "rotateY("+currentDeg+"deg)",
      "transform": "rotateY("+currentDeg+"deg)"
    });
  });




});