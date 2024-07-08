const Food = {
    x:Math.floor(Math.random()* COLUMNS),
    y:Math.floor(Math.random()* ROWS),
    spriteWidth: 200,
    spriteHeight: 200,
    frameX: Math.floor(Math.random()*3 +5),
   image:document.getElementById("snake_zilla"),
    draw(context){
     
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x * CELL_SIZE,
            this.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        
    },
    reset(){
        this.x=Math.floor(Math.random()* COLUMNS);
        this.y=Math.floor(Math.random()* ROWS);
        this.frameX = Math.floor(Math.random()*3 +5)
    }
}