if (document.getElementById('canvas')){
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
} else {
  var canvas = document.createElement('canvas');
  canvas.height = 960;
  canvas.width = 640;
  var context = canvas.getContext('2d');
}

var Ball = function(game){
  this.game = game;
  this.x = canvas.width/2;
  this.y = canvas.height-600;
  this.radius = 10;
  this.startAngle = 0;
}

Ball.prototype = {

  draw: function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.startAngle, Math.PI*2);
    context.fillStyle = "#F00000";
    context.fill();
    context.closePath();
    return this;
  },

  move: function () {
    this.y += 2;
    this.x += -2;
    return this;
  }
};

var ball = new Ball()

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw().move();
  requestAnimationFrame(gameLoop);
});

module.exports = Ball;