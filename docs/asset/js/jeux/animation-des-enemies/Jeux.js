import {Enemy1,Enemy2,Enemy3,Enemy4} from './Enemies.js'
export default class Jeux {
  constructor(canvas) {
    this.canvas = canvas;
    this.gameFrame = 0;
    this.numberOfEnemies = 10;
    this.enemies1 = [];
    this.enemies2 = [];
    this.enemies3 = [];
    this.enemies4 = [];


  }
  restart() {}
  render(context, deltaTime) {
    
  }
  init() {
    for (let i = 0; i < this.numberOfEnemies; i++) {
      this.enemies1.push(new Enemy1(this));
      this.enemies2.push(new Enemy2(this));
      this.enemies3.push(new Enemy3(this));
      this.enemies4.push(new Enemy4(this));
    }
  }
}
