const Canvas = require('./canvas');
const Sounds = require('./sounds');

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
  this.dx = 0;
  this.dy = 7;
  this.sounds = new Sounds;
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
    this.sounds.paddleSound.load();
    this.sounds.paddleSound.play();
  },

  setWallSound: function(){
    this.sounds.wallSound.load();
    this.sounds.wallSound.play();
  },

  setTopSound: function(){
    this.sounds.topSound.load();
    this.sounds.topSound.play();
  },

  setDeathSound: function(){
    this.sounds.deathSound.load();
    this.sounds.deathSound.play();
  },

  setBrickSound: function(){
    this.sounds.brickSound.load();
    this.sounds.brickSound.play();
  },

  move: function () {
    this.collisionDetectionBricks();

    if(this.x + this.dx > this.gameSize.x-this.radius || this.x + this.dx < this.radius) {
      this.setWallSound();
      this.dx = -this.dx;
    }

    if((this.y - this.canvasHeightOffset) + this.dy < this.radius) {
      this.setTopSound();
      this.dy = -this.dy;
    }

    //Drops Below Padde
    else if(this.y + this.dy > this.gameSize.y - (this.radius * 2)) {

      //Left Hit - between -4 and 29 pixels
      if(this.x > this.paddle.position.x - 4 && this.x < this.paddle.position.x + 29) {

        this.setPaddleSound();
        this.setLeftSlope();

      // Left Center Hit - between 30 and 59 pixels
      } else if ((this.x > this.paddle.position.x - 4) && (this.x > this.paddle.position.x + 30) && (this.x < this.paddle.position.x + 59)) {

        this.setPaddleSound();
        this.setLeftCenterSlope();

      // Center Hit - between 60 and 89 pixels
      } else if ((this.x > this.paddle.position.x - 4) && (this.x > this.paddle.position.x + 60) && (this.x < this.paddle.position.x + 89)) {

        this.setPaddleSound();
        this.setCenterSlope();

      // Right Center Hit - between 90 and 119 pixels
      } else if ((this.x > this.paddle.position.x - 4) && (this.x > this.paddle.position.x + 90) && (this.x < this.paddle.position.x + 119)) {

        this.setPaddleSound();
        this.setRightCenterSlope();

      // Right Hit - between 120 and 154 pixels
      } else if ((this.x > this.paddle.position.x - 4) && (this.x > this.paddle.position.x + 120) && (this.x < this.paddle.position.x + 154)) {

        this.setPaddleSound();
        this.setRightSlope();

      } else {
        this.game.lives -= 1;
        if (this.game.lives > 0){
          this.reset();
        } else {
          alert("You Fell into the Wall - GAME OVER");
          this.setDeathSound();
          document.location.reload();
        }
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
        this.setBrickSound();
        this.dy = -this.dy;
        self.bricks[i].status = 0;
        self.bricks.splice(i, 1);
        self.game.score += 10;
      }
    }
    return this.dy;
  }
};

module.exports = Ball;