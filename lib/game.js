const Ball = require('./balls');
const Paddle = require('./paddle');
const Brick = require('./brick');
const Colors = require('./colors');
const Canvas = require('./canvas');


var Game = function(){
  var canvas = new Canvas();

  this.size = { x: canvas.canvas.width, y: canvas.canvas.height };
  var paddle = new Paddle(this);
  var bricks = createBricks(this);

  this.bodies = bricks.concat(createBall(this, paddle, bricks)).concat(paddle);
  this.score = 0;
  this.lives = 3;
  this.status = true;

  var tick = function() {
    this.move();
    this.draw(canvas);
    this.drawScore(canvas);
    this.drawLives(canvas);
    requestAnimationFrame(tick);
  }.bind(this);
  tick();
};

var createBall = function(game, paddle, bricks) {
  var ball = [];
  ball.push(new Ball(game, paddle, bricks));
  return ball;
}

var createBricks = function(game) {
  var bricks = [];
  for (var i = 0; i < 54; i++) {
    var x = (Math.floor(i / 6)) * 87
    var y = 70 + (i % 6) * 18;
    bricks.push(new Brick(game, {x: x, y: y}));
  };
  return bricks;
}

Game.prototype = {

  move: function() {
    if (!this.status) { return; }
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
  },

  drawScore: function(canvas) {
    canvas.font = '16px monospace';
    canvas.fillStyle = "#0095DD ";
    canvas.fillText("Score: "+ this.score, 8, 20);
  },

  drawLives: function(canvas) {
    canvas.font = '16px monospace';
    canvas.fillStyle = "#0095DD ";
    canvas.fillText("Lives: "+ this.lives, 700, 20);
  }
}

module.exports = Game;