import Layer from "./Layer.js";

export default class Jeux {
    constructor(canvas,layers){
        this.canvas = canvas;
        this.gameSpeed = 10;
        this.layersData = layers;
        this.layers=[];
    }
    init(){
        this.layersData.forEach(layer=>{
            this.layers.push(new Layer(this,layer.image,layer.v));
        })
       
    }

    render(context){
        this.layers.forEach((layer) => {
            layer.actualiser();
            layer.dessiner(context);
          });
         
    }
}