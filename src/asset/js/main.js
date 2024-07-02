
window.addEventListener('load',function(){





    let lastTime = 0;
    function animate(timeStamp) {
        deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;


        requestAnimationFrame(animate)
    }

    animate(0);

});