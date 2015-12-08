function Draw(ball, ctx) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, ball.startAngle, Math.PI*2);
  ctx.fillStyle = "#F00000";
  ctx.closePath();
  ctx.fill();
}

module.exports = Draw;
