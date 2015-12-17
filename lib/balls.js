const Sounds = require('./sounds');
const Location = require('./location');

var Ball = function(game, paddle, bricks) {
  this.game = game;
  this.paddle = paddle;
  this.startAngle = 0;
  this.x = game.size.x/2;
  this.y = game.size.y-25;
  this.canvasHeightOffset = 8;
  this.radius = 10;
  this.gameSize = {x: this.game.size.x, y: this.game.size.y};
  this.bricks = bricks;
  this.dy = 10;
  this.dx = -10;
};

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
    if(Location.outterLeft(this)) {
      Sounds.paddle();
      this.setOutterLeftSlope();
    }
    if(Location.innerLeft(this)) {
      Sounds.paddle();
      this.setInnerLeftSlope();
    }
    if(Location.centerLeft(this)) {
      Sounds.paddle();
      this.setCenterLeftSlope();
    }
    if(Location.centerRight(this)) {
      Sounds.paddle();
      this.setCenterRightSlope();
    }
    if(Location.innerRight(this)) {
      Sounds.paddle();
      this.setInnerRightSlope();
    }
    if(Location.outterRight(this)) {
      Sounds.paddle();
      this.setOutterRightSlope();
    }
  },

  collisionDetectionBricks: function() {
    var brickHeight = this.bricks[0].size.y;
    var brickWidth = this.bricks[0].size.x;

    for (var i = 0; i < this.bricks.length; i++) {
      if((this.x > this.bricks[i].position.x) &&
        (this.x < this.bricks[i].position.x + brickWidth) &&
        (this.y - this.radius < this.bricks[i].position.y + brickHeight) &&
        (this.y + this.radius > this.bricks[i].position.y - brickHeight)) {
        Sounds.brick();
        this.dy = -this.dy;
        this.bricks[i].status = 0;
        this.bricks.splice(i, 1);

        if (this.bricks.length === 0) {
          this.game.score += 10;
          this.game.winGame();

        } else {
          this.game.score += 10;
          return this.dy;
        }
      }
    }
  },

  collisionDetectionWalls: function() {
    if(Location.sideWalls(this)) {
      Sounds.wall();
      this.dx = -this.dx;
    }

    if(Location.topWall(this)) {
      Sounds.top();
      this.dy = -this.dy;
    }

    if(Location.bottomWall(this)) {
      this.game.status = false;
      this.game.updateGame();
    }
  },

  setOutterLeftSlope: function() {
    this.dx = -13;
    this.dy = -8;
  },

  setInnerLeftSlope: function() {
    this.dx = -11;
    this.dy = -9;
  },

  setCenterLeftSlope: function() {
    this.dx = -10;
    this.dy = -10;
  },

  setCenterRightSlope: function() {
    this.dx = 10;
    this.dy = -10;
  },

  setInnerRightSlope: function() {
    this.dx = 11;
    this.dy = -9;
  },

  setOutterRightSlope: function() {
    this.dx = 13;
    this.dy = -8;
  }
};

module.exports = Ball;