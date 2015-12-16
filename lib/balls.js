const Canvas = require('./canvas');
const Sounds = require('./sounds');

var Ball = function(game, paddle, bricks){
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
  this.sounds = new Sounds();
}

Ball.prototype = {

  draw: function(canvas) {
    canvas.beginPath();
    canvas.arc(this.x, this.y, this.radius, this.startAngle, Math.PI*2);
    canvas.fillStyle = "#F00000";
    canvas.fill();
    canvas.closePath();
  },

  setLeftSlope: function(){
    this.dx = -13
    this.dy = -8
  },

  setLeftCenterSlope: function(){
    this.dx = -11
    this.dy = -9
  },

  setLeftCenterCenterSlope: function(){
    this.dx = -10
    this.dy = -10
  },

  setRightCenterCenterSlope: function(){
    this.dx = 10
    this.dy = -10
  },

  setRightCenterSlope: function(){
    this.dx = 11
    this.dy = -9
  },

  setRightSlope: function(){
    this.dx = 13
    this.dy = -8
  },

  setPaddleSound: function(){
    this.sounds.paddleSound.load();
    this.sounds.paddleSound.play();
  },

  setWallSound: function(){
    this.sounds.wallSound.load();
    this.sounds.wallSound.play();
  },

  setTopSound: function(){
    this.sounds.topSound.load();
    this.sounds.topSound.play();
  },

  setDeathSound: function(){
    this.sounds.deathSound.load();
    this.sounds.deathSound.play();
  },

  setBrickSound: function(){
    this.sounds.brickSound.load();
    this.sounds.brickSound.play();
  },

  setWinSound: function(){
    this.sounds.winSound.load();
    this.sounds.winSound.play();
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
    if((this.x >= this.paddle.position.x - 4) && (this.x <= this.paddle.position.x + 24)) {
        this.setPaddleSound();
        this.setLeftSlope();
    }
    if((this.x >= this.paddle.position.x + 25) && (this.x <= this.paddle.position.x + 49)) {
      this.setPaddleSound();
      this.setLeftCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 50) && (this.x <= this.paddle.position.x + 74)) {
      this.setPaddleSound();
      this.setLeftCenterCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 75) && (this.x <= this.paddle.position.x + 99)) {
      this.setPaddleSound();
      this.setRightCenterCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 100) && (this.x <= this.paddle.position.x + 124)) {
      this.setPaddleSound();
      this.setRightCenterSlope();
    }
    if((this.x >= this.paddle.position.x + 125) && (this.x <= this.paddle.position.x + 154)) {
      this.setPaddleSound();
      this.setRightSlope();
    }
    if((this.x < this.paddle.position.x - 4) || (this.x > this.paddle.position.x + 154)) {
      this.updateGame();
    }
  },

  updateGame: function() {
    this.game.lives -= 1
    var lives = this.game.lives

    if(lives > 0) {
      this.pause();
      this.resetGame();
      this.displayStyles('ball-reset', 'inline');
      setTimeout(function () {
        this.game.status = true;
        this.dy = 10;
        this.displayStyles('ball-reset', 'none');
      }.bind(this), 2000);
    }
    else {
      this.loseGame();
    }
  },

  pause: function() {
    this.dx = 0;
    this.dy = 0;
    this.game.status = false;
  },

  resetGame: function() {
    this.startAngle = 0;
    this.x = canvas.width/2;
    this.y = canvas.height-25;
    this.paddle.position = { x: this.game.size.x/2-75, y: this.game.size.y-15 };
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

   winGame: function(){
    this.sounds.themeSound.volume = 0.00;
    this.displayStyles('winning', 'inline');
    this.setWinSound();
    this.showText("#won-title", "Congratulations You Won!", 0, 150);
    this.showText("#final-score", "Final Score: " + this.game.score, 0, 150);
    this.getId('restart').onclick = function(){
      document.location.reload();
    }
  },

  loseGame: function(){
    this.dy = 0;
    this.sounds.themeSound.volume = 0.00;
    this.sounds.wallSound.volume = 0.00;
    this.displayStyles('losing', 'inline');
    this.setDeathSound();
    this.showText("#lose-title", "Sorry, you died!", 0, 150);
    this.showText("#final-score-lose", "Final Score: " + this.game.score, 0, 150);
    this.getId('restart-lose').onclick = function(){
      document.location.reload();
    }
  },

  displayStyles: function(location, style){
    document.getElementById(location).style.display = style;
  },


  getId: function(id){
    return document.getElementById(id)
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
        this.setBrickSound();
        this.dy = -this.dy;
        self.bricks[i].status = 0;
        self.bricks.splice(i, 1);

        if (self.bricks.length === 0) {
          self.game.score += 10;
          this.winGame();

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
      self.setWallSound();
      self.dx = -self.dx;
    }

    if((self.y - self.canvasHeightOffset) + self.dy < self.radius) {
      self.setTopSound();
      self.dy = -self.dy;
    }
  }
};

module.exports = Ball;