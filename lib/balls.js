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
    if(this.y + dy < this.radius) {
      dy = -dy;
    }
    if(this.x + dx > canvas.width-this.radius || this.x + dx < this.radius) {
      dx = -dx;
    }

    //Drops below paddle
    else if(this.y + dy > canvas.height-this.radius) {


        //Ball width position
        //Hits the paddle (where)
        // this.y + dy < canvas.height - this.paddle.size.y - this.radius
      if(this.x > this.paddle.paddleX && this.x < this.paddle.paddleX + this.paddle.size.x) {
        debugger
        dy = -dy;
      }
      else {
        //Going out bottom
        // alert("GAME OVER");
        // document.location.reload();
      }
   }

   // else if(y + dy > canvas.height-ballRadius) {
        // if(x > paddleX && x < paddleX + paddleWidth) {
   //          dy = -dy;
   //      }
   //      else {
   //          alert("GAME OVER");
   //          document.location.reload();
   //      }
   //  }





    this.x += dx;
    this.y += dy;
  }
};

module.exports = Ball;