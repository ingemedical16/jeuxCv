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

export  function collision(first, second) {
    return !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    );
  }
export  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }



