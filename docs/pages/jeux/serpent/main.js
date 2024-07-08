window.addEventListener('keydown',function(e){
    if(e.key ==='ArrowUp') Snake.moveUp();
    else if (e.key === 'ArrowDown') Snake.moveDown();
    else if (e.key === 'ArrowLeft') Snake.moveLeft();
    else if (e.key === 'ArrowRight') Snake.moveRight();
})
window.addEventListener('load',function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width =GAME.with;
    canvas.height = GAME.height;
    ctx.font = '18px "Press Start 2P"';
    ctx.textBaseline='top';
    
    canvas.addEventListener('click',()=>{
        if(GAME.gameOver){
            resetGame();
            GAME.loop = setInterval(animate,500);
        }
    })
    
    resetGame();

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        Snake.draw(ctx);
        Snake.update();
        Food.draw(ctx);
        if(GAME.gameOver){
            ctx.textAlign= 'center';
            ctx.fillStyle = 'black';
            ctx.font = '40px "Press Start 2P"'
            ctx.fillText('Game Over', GAME.with*0.5,GAME.height*0.5,GAME.with*0.95);
            ctx.font = '18px "Press Start 2P"'
            ctx.fillText('Click here to restart!', GAME.with*0.5,GAME.height*0.4 +40,GAME.with*0.95);
            clearInterval(GAME.loop);
        }
    }
   GAME.loop = setInterval(animate,500);
});