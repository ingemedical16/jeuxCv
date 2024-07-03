export const getRandomHexColore = ()=>{
    const digit = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    var color="#"
    for (var i=0;i<6;i++){
        var j = parseInt((Math.random()* (digit.length -1)));
        color += digit[j].toString();
    };
    console.log(color);
    return color;
};
/**
 * 
 * @param {object} ctx // context de canvas
 * @param {Object} input //input Object a une proprieties latKey  la chaîne de caractère qui va affiché sur l’écran 
 * @param {Object} player // Object player  to have assecs to his method and proprette 
 */
export function drawStatusText(ctx,input,player){
    ctx.font = "28px Helvetica";
    ctx.fillText("Last input: " + input.lastKey,20,50);
    ctx.fillText("Active State: " + player.currentState.state,20,90);
}



