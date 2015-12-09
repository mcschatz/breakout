var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function Ball(x, y, r, a){
  this.x = canvas.width/2;
  this.y = canvas.height-600;
  this.radius = r || 10;
  this.startAngle = a || 0;
}

Ball.prototype.draw = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, this.startAngle, Math.PI*2);
  context.fillStyle = "#F00000";
  context.fill();
  context.closePath();
  return this;
}

Ball.prototype.move = function (){
  this.y += 2;
  this.x += -2;
  return this;
}

var ball = new Ball()

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw().move();
  requestAnimationFrame(gameLoop);
});

module.exports = Ball;