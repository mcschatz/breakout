const Ball = require('./balls');
const Paddle = require('./paddle');
const Brick = require('./brick');


var Game = function(){
  var canvas = document.getElementById("canvas").getContext('2d');
  this.size = { x: canvas.canvas.width, y: canvas.canvas.height };
  this.bodies = createBricks(this).concat(createBall(this)).concat(new Paddle(this));

  var self = this;
  var tick = function() {
    self.move();
    self.draw(canvas);
    requestAnimationFrame(tick);
  };
  tick();
};

var createBall = function(game) {
  var ball = [];
  ball.push(new Ball(game));
  return ball;
}

var createBricks = function(game) {
  var bricks = [];
  for (var i = 0; i < 24; i++) {
    var x = 35 + (i % 8) * 30;
    var y = 35 + (i % 3) * 30;
    bricks.push(new Brick(game, { x: x, y: y}));
  };
  return bricks;
}

Game.prototype = {

  move: function() {
    for (var i = 0; i < this.bodies.length; i++) {
      if (this.bodies[i].move !== undefined) {
        this.bodies[i].move(canvas);
      }
    }
  },

  draw: function(canvas) {
    canvas.clearRect(0, 0, this.size.x, this.size.y);
    for (var i = 0; i < this.bodies.length; i++) {
      if (this.bodies[i].draw !== undefined) {
        this.bodies[i].draw(canvas);
      }
    }
  }
}

module.exports = Game;