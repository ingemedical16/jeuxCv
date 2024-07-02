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

