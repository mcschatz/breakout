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
}

Ball.prototype = {

  draw: function(canvas) {
    canvas.beginPath();
    canvas.arc(this.x, this.y, this.radius, this.startAngle, Math.PI*2);
    canvas.fillStyle = "#F00000";
    canvas.fill();
    canvas.closePath();
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
        Sounds.paddleSound;
        this.setLeftSlope();
    }
    if((this.x >= this.paddle.position.x + 25) && (this.x <= this.paddle.position.x + 49)) {
      Sounds.paddleSound;
      this.setLeftCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 50) && (this.x <= this.paddle.position.x + 74)) {
      Sounds.paddleSound;
      this.setLeftCenterCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 75) && (this.x <= this.paddle.position.x + 99)) {
      Sounds.paddleSound;
      this.setRightCenterCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 100) && (this.x <= this.paddle.position.x + 124)) {
      Sounds.paddleSound;
      this.setRightCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 125) && (this.x <= this.paddle.position.x + 150 + this.radius)) {
      this.setPaddleSound();
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
        Sounds.brickSound();
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
    var self = this;

    if(self.x + self.dx > self.gameSize.x-self.radius || self.x + self.dx < self.radius) {
      Sounds.wallSound();
      self.dx = -self.dx;
    }

    if((self.y - self.canvasHeightOffset) + self.dy < self.radius) {
      Sounds.topSound();
      self.dy = -self.dy;
    }

    if(self.y > 520) {
      self.game.status = false
      self.game.updateGame();
    }
  },

  showText: function (target, message, index, interval) {
    if (index < message.length) {
      $(target).append(message[index++]);
      var self = this
      setTimeout(function () {
        self.showText(target, message, index, interval);
      }, interval);
    }
  },

  displayStyles: function(location, style) {
    document.getElementById(location).style.display = style;
  },

  getId: function(id) {
    return document.getElementById(id)
  }
};

module.exports = Ball;