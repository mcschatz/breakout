const Canvas = require('./canvas');

var dx = -5;
var dy = 5;

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
    dy = -dy
  },

  move: function () {
    this.collisionDetectionBricks();

    if(this.x + dx > this.gameSize.x-this.radius || this.x + dx < this.radius) {
      this.game.wallSound.load();
      this.game.wallSound.play();
      dx = -dx;
    }

    if((this.y - this.canvasHeightOffset) + dy < this.radius) {
      this.game.topSound.load();
      this.game.topSound.play();
      dy = -dy;
    }

    else if(this.y + dy > this.gameSize.y - (this.radius * 2)) {
      if(this.x > this.paddle.position.x - 3 && this.x < this.paddle.position.x - 3 + this.paddle.size.x) {
        this.game.paddleSound.load();
        this.game.paddleSound.play();
        dy = -dy;
      }
      else {

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
    this.x += dx;
    this.y += dy;
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
        dy = -dy;
        self.bricks[i].status = 0;
        self.bricks.splice(i, 1);
        self.game.score += 10;
      }
    }
    return dy;
  }
};

module.exports = Ball;