const Ball = require('./balls');
const Paddle = require('./paddle');
const Brick = require('./brick');
const Colors = require('./colors');
const Canvas = require('./canvas');


var Game = function(){
  var canvas = new Canvas();

  this.size = { x: canvas.canvas.width, y: canvas.canvas.height };
  var paddle = new Paddle(this);
  this.bodies = createBricks(this).concat(createBall(this, paddle)).concat(paddle);

  this.paddleSound = document.getElementById("paddle-sound");
  this.topSound = document.getElementById("top-sound");
  this.wallSound = document.getElementById("wall-sound");
  this.deathSound = document.getElementById("death-sound");

  var self = this;
  var tick = function() {
    self.move();
    self.draw(canvas);
    requestAnimationFrame(tick);
  };
  tick();
};

var createBall = function(game, paddle) {
  var ball = [];
  ball.push(new Ball(game, paddle));
  return ball;
}

var createBricks = function(game) {
  var bricks = [];
  for (var i = 0; i < 54; i++) {
    var x = (Math.floor(i / 6)) * 88
    var y = 70 + (i % 6) * 19;
    bricks.push(new Brick(game, {x: x, y: y}));
  };
  return bricks;
}

Game.prototype = {

  move: function() {
    for (var i = 0; i < this.bodies.length; i++) {
      if (this.bodies[i].move !== undefined) {
        this.bodies[i].move();
      }
    }
  },

  draw: function(canvas) {
    canvas.clearRect(0, 0, this.size.x, this.size.y);
    var colorList = new Colors();
    for (var i = 0; i < this.bodies.length; i++) {
      if (this.bodies[i].draw !== undefined) {
        this.bodies[i].draw(canvas, colorList[i].toString());
      }
    }
  }
}

module.exports = Game;