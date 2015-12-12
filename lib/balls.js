if (document.getElementById('canvas')){
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
} else {
  var canvas = document.createElement('canvas');
  canvas.height = 960;
  canvas.width = 640;
  var context = canvas.getContext('2d');
}

var dx = 10;
var dy = -10;

var Ball = function(game, paddle){
  this.game = game;
  this.paddle = paddle;
  this.x = canvas.width/2;
  this.y = canvas.height-30;
  this.radius = 10;
  this.startAngle = 0;
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

    //Left and Right Detection
    if(this.x + dx > canvas.width-this.radius || this.x + dx < this.radius) {
      this.game.wallSound.load();
      this.game.wallSound.play();
      dx = -dx;
    }

    //Top Detection
    if(this.y + dy < this.radius) {
      this.game.topSound.load();
      this.game.topSound.play();
      dy = -dy;
    }

    //Checks to See if Drops Below Paddle
    else if(this.y + dy > canvas.height - (this.radius * 2)) {
      //If ball drops below paddle check paddle and center of paddle
      if(this.x > this.paddle.center.x && this.x < this.paddle.center.x + this.paddle.size.x) {
        this.game.paddleSound.load();
        this.game.paddleSound.play();
        dy = -dy;
      }
      //Else End the Game
      else {
        // this.game.deathSound.load();
        // this.game.deathSound.play();
        // alert("You Feel into the Wall - GAME OVER");
        // document.location.reload();
      }
   }
    this.x += dx;
    this.y += dy;
  }
};

module.exports = Ball;