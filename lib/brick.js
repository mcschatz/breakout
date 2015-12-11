var Brick = function(game, center) {
  this.game = game;
  this.center = center;
  this.size = {x: 80, y: 15};
};

Brick.prototype = {

  draw: function(canvas, color) {
    canvas.beginPath();
    canvas.rect(this.center.x, this.center.y, this.size.x, this.size.y)
    canvas.fillStyle = color;
    canvas.fill();
    canvas.closePath();
  }
}

module.exports = Brick;