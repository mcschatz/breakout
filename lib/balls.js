function Ball(x, y, r, a){
  this.x = x || 50;
  this.y = y || 50;
  this.radius = r || 10;
  this.startAngle = a || 0;
}

module.exports = Ball;