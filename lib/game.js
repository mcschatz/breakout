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

  this.bodies = createBall(this, paddle, bricks).concat(paddle).concat(bricks);
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
  },

  updateGame: function() {
    this.lives -= 1
    var lives = this.lives

    if(lives > 0) {
      this.pause();
      this.resetGame();

      setTimeout(function () {
        this.status = true;
        this.bodies[0].dy = 10;
      }.bind(this), 2000);
    }
    else {
      this.loseGame();
    }
  },

  pause: function() {
    this.bodies[0].dx = 0;
    this.bodies[0].dy = 0;
    this.status = false;
  },

  resetGame: function() {
    this.bodies[0].startAngle = 0;
    this.bodies[0].x = canvas.width/2;
    this.bodies[0].y = canvas.height-25;
    this.bodies[1].position = { x: this.size.x/2-75, y: this.size.y-15 };
  },

  winGame: function() {
    Sounds.themeSound.volume = 0.00;
    this.displayStyles('winning', 'inline');
    this.setWinSound();
    this.showText("#won-title", "Congratulations You Won!", 0, 150);
    this.showText("#final-score", "Final Score: " + this.game.score, 0, 150);
    this.getId('restart').onclick = function(){
      document.location.reload();
    }
  },

  loseGame: function() {
    this.dy = 0;
    Sounds.themeSound.volume = 0.00;
    Sounds.wallSound.volume = 0.00;
    this.displayStyles('losing', 'inline');
    Sounds.deathSound();
    this.showText("#lose-title", "Sorry, you died!", 0, 150);
    this.showText("#final-score-lose", "Final Score: " + this.game.score, 0, 150);
    this.getId('restart-lose').onclick = function(){
      document.location.reload();
    }
  }
}

module.exports = Game;