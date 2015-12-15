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
  this.dy = 5
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
  this.dx = -5
  this.dy = -this.dy
  },

  setCenterSlope: function(){
  this.dx = 0
  this.dy = -this.dy
  },

  setRightSlope: function(){
  this.dx = 5
  this.dy = -this.dy
  },

  move: function () {
    this.collisionDetectionBricks();

    if(this.x + this.dx > this.gameSize.x-this.radius || this.x + this.dx < this.radius) {
      this.game.wallSound.load();
      this.game.wallSound.play();
      this.dx = -this.dx;
    }

    if((this.y - this.canvasHeightOffset) + this.dy < this.radius) {
      this.game.topSound.load();
      this.game.topSound.play();
      this.dy = -this.dy;
    }

    //Drops Below Padde
    else if(this.y + this.dy > this.gameSize.y - (this.radius * 2)) {
      //Left Hit - between -3 and 49 pixels
      if(this.x > this.paddle.position.x - 4 && this.x < this.paddle.position.x + 49) {

        this.game.paddleSound.load();
        this.game.paddleSound.play();

        this.setLeftSlope();

      // Center Hit - between 40 and 79 pixels
      } else if ((this.x > this.paddle.position.x - 4) && (this.x > this.paddle.position.x + 50) && (this.x < this.paddle.position.x + 99)) {

        this.game.paddleSound.load();
        this.game.paddleSound.play();

        this.setCenterSlope();

      // Right Hit - between 80 and 123 pixels
      } else if ((this.x > this.paddle.position.x - 4) && (this.x > this.paddle.position.x + 100) && (this.x < this.paddle.position.x + 154)) {

        this.game.paddleSound.load();
        this.game.paddleSound.play();

        this.setRightSlope();

      } else {
        this.game.lives -= 1;
        if (this.game.lives > 0){
          this.reset();
        } else {
          alert("You Fell into the Wall - GAME OVER");
          this.game.deathSound.load();
          this.game.deathSound.play();
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
        this.game.brickSound.load();
        this.game.brickSound.play();
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