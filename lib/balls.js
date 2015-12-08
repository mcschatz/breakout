// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');

function Ball(x, y, r, a){
  this.x = x || 50;
  this.y = y || 50;
  this.radius = r || 10;
  this.startAngle = a || 0;
}

// function Draw(ball){
//   ctx.beginPath();
//   ctx.arc(ball.x, ball.y, ball.radius, ball.startAngle, Math.PI*2);
//   ctx.fillStyle = "#F00000";
//   ctx.closePath();
//   ctx.fill();
// }

module.exports = Ball;