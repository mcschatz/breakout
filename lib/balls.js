const Canvas = require('./canvas');

var dx = 5;
var dy = -5;

var Ball = function(game, paddle, bricks){
  var canvas = new Canvas().canvas;
  this.game = game;
  this.paddle = paddle;
  this.x = canvas.width/2;
  this.y = canvas.height-30;
  this.radius = 10;
  this.startAngle = 0;
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

  move: function () {
    this.collisionDetection();

    if(this.x + dx > this.gameSize.x-this.radius || this.x + dx < this.radius) {
      this.game.wallSound.load();
      this.game.wallSound.play();
      dx = -dx;
    }

    if(this.y + dy < this.radius) {
      this.game.topSound.load();
      this.game.topSound.play();
      dy = -dy;
    }

    else if(this.y + dy > this.gameSize.y - (this.radius * 2)) {
      if(this.x > this.paddle.center.x && this.x < this.paddle.center.x + this.paddle.size.x) {
        this.game.paddleSound.load();
        this.game.paddleSound.play();
        dy = -dy;
      }
      else {
        // this.game.deathSound.load();
        // this.game.deathSound.play();
        // alert("You Fell into the Wall - GAME OVER");
        // document.location.reload();
      }
   }
    this.x += dx;
    this.y += dy;
  },

  collisionDetection: function() {
    var self = this;
    var halfHeight = self.bricks[0].size.y/2
    var halfWidth = self.bricks[0].size.x/2
    for (var i = 0; i < self.bricks.length; i++) {
      if((self.x > self.bricks[i].center.x && self.x < self.bricks[i].center.x + halfWidth) &&
         ((self.y - self.radius) < self.bricks[i].center.y && (self.y - self.radius) > self.bricks[i].center.y - halfHeight)) {
        dy = -dy;
      }
    }
    return dy;
  }
};

module.exports = Ball;