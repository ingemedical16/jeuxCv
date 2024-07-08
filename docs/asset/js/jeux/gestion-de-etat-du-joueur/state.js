import { KEYEVENT } from "../../../../static/db.js";
export const states = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
  SITTING_LEFT:2,
  SITTING_RIGHT:3,
  RUNNING_LEFT:4,
  RUNNING_RIGHT:5,
  JUMPING_LEFT:6,
  JUMPING_RIGHT:7,
  FALLING_LEFT:8,
  FALLING_RIGHT:9
};


export class State {
  // Parent class also called "super class"
  constructor(state) {
    this.state = state;
  }
}

export class StandingLeft extends State {
  //child class also called "sub class"
  constructor(player) {
    super("STANDING LEFT");
    this.player = player;
  }
  enter(){
    this.player.frameY = 1;
    this.player.speed = 0;
    this.player.maxFrame = 6;
  }
  handleInput(input){
    if(input === KEYEVENT.PRESS_RIGHT) this.player.setState(states.RUNNING_RIGHT)// set state to standingRight
    else if(input === KEYEVENT.PRESS_LEFT) this.player.setState(states.RUNNING_LEFT)
    else if(input=== KEYEVENT.PRESS_DOWN) this.player.setState(states.SITTING_LEFT)
    else if(input=== KEYEVENT.PRESS_UP) this.player.setState(states.JUMPING_LEFT)
  }
}

export class StandingRight extends State {
    //child class also called "sub class"
    constructor(player) {
      super("STANDING RIGHT");
      this.player = player;
    }
    enter(){
        this.player.frameY =0;
        this.player.speed = 0;
        this.player.maxFrame = 6;
    }
    handleInput(input){
        if(input === KEYEVENT.PRESS_LEFT) this.player.setState(states.RUNNING_LEFT)// set state to standingLeft
        if(input === KEYEVENT.PRESS_RIGHT) this.player.setState(states.RUNNING_RIGHT)
        else if(input=== KEYEVENT.PRESS_DOWN) this.player.setState(states.SITTING_RIGHT)
        else if(input=== KEYEVENT.PRESS_UP) this.player.setState(states.JUMPING_RIGHT)
    }
  }

  export class SittingLeft extends State {
    //child class also called "sub class"
    constructor(player) {
      super("SITTING LEFT");
      this.player = player;
    }
    enter(){
      this.player.frameY = 9;
      this.player.speed = 0;
      this.player.maxFrame =4;
    }
    handleInput(input){
        
      if(input === KEYEVENT.PRESS_RIGHT) this.player.setState(states.SITTING_RIGHT)// set state to standingRight
      else if(input === KEYEVENT.PRESS_UP)this.player.setState(states.STANDING_LEFT)
    }
  }

  export class SittingRight extends State {
    //child class also called "sub class"
    constructor(player) {
      super("SITTING RIGHT");
      this.player = player;
    }
    enter(){
      this.player.frameY = 8;
      this.player.speed = 0;
      this.player.maxFrame =4;
      
    }
    
    handleInput(input){
      if(input === KEYEVENT.PRESS_LEFT) this.player.setState(states.SITTING_LEFT)// set state to standingRight
      else if(input === KEYEVENT.PRESS_UP)this.player.setState(states.STANDING_RIGHT)
    }
  }


  export class RunningLeft extends State {
    //child class also called "sub class"
    constructor(player) {
      super("RUNNING LEFT");
      this.player = player;
    }
    enter(){
      this.player.frameY = 7;
      this.player.speed = -this.player.maxSpeed;
      this.player.maxFrame = 8;
    }
    handleInput(input){
      if(input === KEYEVENT.PRESS_RIGHT) this.player.setState(states.RUNNING_RIGHT)// set state to standingRight
      else if(input ===  KEYEVENT.RELEASE_LEFT)this.player.setState(states.STANDING_LEFT)
      else if(input=== KEYEVENT.PRESS_DOWN) this.player.setState(states.SITTING_LEFT)
    }
  }

  export class RunningRight extends State {
    //child class also called "sub class"
    constructor(player) {
      super("RUNNING RIGHT");
      this.player = player;
    }
    enter(){
      this.player.frameY = 6;
      this.player.speed = this.player.maxSpeed;
      this.player.maxFrame = 8;
    }
    handleInput(input){
      if(input === KEYEVENT.PRESS_LEFT) this.player.setState(states.RUNNING_LEFT)// set state to standingRight
      else if(input === KEYEVENT.RELEASE_RIGHT)this.player.setState(states.STANDING_RIGHT)
      else if(input === KEYEVENT.PRESS_DOWN)this.player.setState(states.SITTING_RIGHT)
    }
  }



  export class JumpingLeft extends State {
    //child class also called "sub class"
    constructor(player) {
      super("JUMPING LEFT");
      this.player = player;
    }
    enter(){
      this.player.frameY = 3;
      if(this.player.onGround()) this.player.vy -= 40;
      this.player.speed = -this.player.maxSpeed * 0.5;
      this.player.maxFrame =6;
      
    }
    handleInput(input){
    if(input === KEYEVENT.PRESS_RIGHT) this.player.setState(states.JUMPING_RIGHT)
     else if(this.player.onGround()) this.player.setState(states.STANDING_LEFT)
    else if(this.player.vy > 0) this.player.setState(states.FALLING_LEFT)
    }
  }

  export class JumpingRight extends State {
    //child class also called "sub class"
    constructor(player) {
      super("JUMPING RIGHT");
      this.player = player;
    }
    enter(){
      this.player.frameY = 2;
      if(this.player.onGround()) this.player.vy -=20;
      this.player.speed = this.player.maxSpeed * 0.5;
      this.player.maxFrame =6;
     
    }
    handleInput(input){
        if(input === KEYEVENT.PRESS_LEFT) this.player.setState(states.JUMPING_LEFT)
        else if(this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
        else if(this.player.vy > 0) this.player.setState(states.FALLING_RIGHT)
        
    }
  }

  export class FALLINGLeft extends State {
    //child class also called "sub class"
    constructor(player) {
      super("FALLING LEFT");
      this.player = player;
    }
    enter(){
      this.player.frameY = 5;
      this.player.maxFrame = 6
      
    }
    handleInput(input){
    if(input === KEYEVENT.PRESS_RIGHT) this.player.setState(states.FALLING_RIGHT)
     else if(this.player.onGround()) this.player.setState(states.STANDING_LEFT)
    }
  }

  export class FALLINGRight extends State {
    //child class also called "sub class"
    constructor(player) {
      super("FALLING RIGHT");
      this.player = player;
    }
    enter(){
      this.player.frameY = 4;
      this.player.maxFrame = 6
     
    }
    handleInput(input){
        if(input === KEYEVENT.PRESS_LEFT) this.player.setState(states.FALLING_LEFT)
        else if(this.player.onGround()) this.player.setState(states.STANDING_RIGHT)
        
    }
  }


  
  
