if (document.getElementById('canvas')){
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
} else {
  var canvas = document.createElement('canvas');
  canvas.height = 960;
  canvas.width = 640;
  var context = canvas.getContext('2d');
}

var dx = 5;
var dy = -5;

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
      dx = -dx;
    }

    //Top Detection
    if(this.y + dy < this.radius) {
      dy = -dy;
    }

    //Checks to See if Drops Below Paddle
    else if(this.y + dy > canvas.height-this.radius) {
      //If ball drops below paddle check paddle and center of paddle
      if(this.x > this.paddle.center.x && this.x < this.paddle.center.x + this.paddle.size.x) {
        dy = -dy;
      }
      //Else End the Game
      else {
        // KNOWN BUG - MUST HAVE ALERT
        // alert("You Feel into the Wall - GAME OVER");
        // document.location.reload();
      }
   }
    this.x += dx;
    this.y += dy;
  }
};

module.exports = Ball;