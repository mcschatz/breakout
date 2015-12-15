const Canvas = require('./canvas');

var Ball = function(game, paddle, bricks){
  var canvas = new Canvas().canvas;
  this.game = game;
  this.paddle = paddle;
  this.startAngle = 0;
  this.x = canvas.width/2;
  this.y = canvas.height-30;
  this.canvasHeightOffset = 8;
  this.radius = 10;
  this.gameSize = {x: this.game.size.x, y: this.game.size.y};
  this.bricks = bricks;
  this.dx = 0
  this.dy = 7
}

Ball.prototype = {

  draw: function(canvas) {
    canvas.beginPath();
    canvas.arc(this.x, this.y, this.radius, this.startAngle, Math.PI*2);
    canvas.fillStyle = "#F00000";
    canvas.fill();
    canvas.closePath();
  },

  reset: function(){
    this.startAngle = 0;
    this.x = canvas.width/2;
    this.y = canvas.height-30;
    this.dy = -this.dy
  },

  setLeftSlope: function(){
  this.dx = -9
  this.dy = -this.dy
  },

  setLeftCenterSlope: function(){
  this.dx = -8
  this.dy = -this.dy
  },

  setCenterSlope: function(){
  this.dx = 0
  this.dy = -this.dy
  },

  setRightCenterSlope: function(){
  this.dx = 8
  this.dy = -this.dy
  },

  setRightSlope: function(){
  this.dx = 9
  this.dy = -this.dy
  },

  setPaddleSound: function(){
    this.game.paddleSound.load();
    this.game.paddleSound.play();
  },

  setWallSound: function(){
    this.game.wallSound.load();
    this.game.wallSound.play();
  },

  setTopSound: function(){
    this.game.topSound.load();
    this.game.topSound.play();
  },

  setDeathSound: function(){
    this.game.deathSound.load();
    this.game.deathSound.play();
  },

  move: function () {
    this.collisionDetectionBricks();
    this.collisionDetectionWalls();

    //Drops Below Padde
    if(this.y + this.dy > this.gameSize.y - (this.radius * 2)) {

      //Left Hit - between -4 and 29 pixels
      if(this.x > this.paddle.position.x - 4 && this.x <= this.paddle.position.x + 29) {
        this.setPaddleSound();
        this.setLeftSlope();
      }

      // Left Center Hit - between 30 and 59 pixels
      if((this.x >= this.paddle.position.x + 30) && (this.x <= this.paddle.position.x + 59)) {
        this.setPaddleSound();
        this.setLeftCenterSlope();
      }

      // Center Hit - between 60 and 89 pixels
      if((this.x >= this.paddle.position.x + 60) && (this.x <= this.paddle.position.x + 89)) {
        this.setPaddleSound();
        this.setCenterSlope();
      }

      // Right Center Hit - between 90 and 119 pixels
      if((this.x >= this.paddle.position.x + 90) && (this.x <= this.paddle.position.x + 119)) {
        this.setPaddleSound();
        this.setRightCenterSlope();
      }

      // Right Hit - between 120 and 154 pixels
      if((this.x >= this.paddle.position.x + 120) && (this.x <= this.paddle.position.x + 154)) {
        this.setPaddleSound();
        this.setRightSlope();
      }
      else {
        console.log("in the shit");
      //   this.game.lives -= 1;
      //   this.reset();
      // } else {
      //   alert("You Fell into the Wall - GAME OVER");
      //   this.setDeathSound();
      //   document.location.reload();
      }
    }
    this.x += this.dx;
    this.y += this.dy;
  },

  collisionDetectionBricks: function() {
    var self = this;
    var brickHeight = self.bricks[0].size.y;
    var brickWidth = self.bricks[0].size.x;

    for (var i = 0; i < self.bricks.length; i++) {
      if((self.x > self.bricks[i].position.x)
        && (self.x < self.bricks[i].position.x + brickWidth)
        && (self.y - self.radius < self.bricks[i].position.y + brickHeight)
        && (self.y + self.radius > self.bricks[i].position.y - brickHeight)) {
        this.game.brickSound.load();
        this.game.brickSound.play();
        this.dy = -this.dy;
        self.bricks[i].status = 0;
        self.bricks.splice(i, 1);
        self.game.score += 10;
      }
    }
    return this.dy;
  },

  collisionDetectionWalls: function() {
    var self = this;

    if(self.x + self.dx > self.gameSize.x-self.radius || self.x + self.dx < self.radius) {
      self.setWallSound();
      self.dx = -self.dx;
    }

    if((self.y - self.canvasHeightOffset) + self.dy < self.radius) {
      self.setTopSound();
      self.dy = -self.dy;
    }
  }
};

module.exports = Ball;