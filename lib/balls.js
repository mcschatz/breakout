const Canvas = require('./canvas');
const Sounds = require('./sounds');

var Ball = function(game, paddle, bricks) {
  var canvas = new Canvas().canvas;
  this.game = game;
  this.paddle = paddle;
  this.startAngle = 0;
  this.x = canvas.width/2;
  this.y = canvas.height-25;
  this.canvasHeightOffset = 8;
  this.radius = 10;
  this.gameSize = {x: this.game.size.x, y: this.game.size.y};
  this.bricks = bricks;
  this.dy = 10;
  this.dx = -10;
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
    this.collisionDetectionBricks();
    this.collisionDetectionWalls();

    if(this.y + this.dy > this.gameSize.y - (this.radius * 2)) {
      this.collisionDetectionPaddle();
    }

    this.x += this.dx;
    this.y += this.dy;
  },

  collisionDetectionPaddle: function() {
    if((this.x >= this.paddle.position.x - this.radius) && (this.x <= this.paddle.position.x + 24)) {
      Sounds.paddle();
      this.setLeftSlope();
    }
    if((this.x >= this.paddle.position.x + 25) && (this.x <= this.paddle.position.x + 49)) {
      Sounds.paddle();
      this.setLeftCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 50) && (this.x <= this.paddle.position.x + 74)) {
      Sounds.paddle();
      this.setLeftCenterCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 75) && (this.x <= this.paddle.position.x + 99)) {
      Sounds.paddle();
      this.setRightCenterCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 100) && (this.x <= this.paddle.position.x + 124)) {
      Sounds.paddle();
      this.setRightCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 125) && (this.x <= this.paddle.position.x + 150 + this.radius)) {
      Sounds.paddle();
      this.setRightSlope();
    }
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
        Sounds.brick();
        this.dy = -this.dy;
        self.bricks[i].status = 0;
        self.bricks.splice(i, 1);

        if (self.bricks.length === 0) {
          self.game.score += 10;
          this.game.winGame();

        } else {
          self.game.score += 10;
          return this.dy;
        }
      }
    }
  },

  collisionDetectionWalls: function() {
    if(this.x + this.dx > this.gameSize.x-this.radius || this.x + this.dx < this.radius) {
      Sounds.wall();
      this.dx = -this.dx;
    }

    if((this.y - this.canvasHeightOffset) + this.dy < this.radius) {
      Sounds.top();
      this.dy = -this.dy;
    }

    if(this.y > 520) {
      this.game.status = false
      this.game.updateGame();
    }
  },

  setLeftSlope: function() {
    this.dx = -13
    this.dy = -8
  },

  setLeftCenterSlope: function() {
    this.dx = -11
    this.dy = -9
  },

  setLeftCenterCenterSlope: function() {
    this.dx = -10
    this.dy = -10
  },

  setRightCenterCenterSlope: function() {
    this.dx = 10
    this.dy = -10
  },

  setRightCenterSlope: function() {
    this.dx = 11
    this.dy = -9
  },

  setRightSlope: function() {
    this.dx = 13
    this.dy = -8
  }
};

module.exports = Ball;