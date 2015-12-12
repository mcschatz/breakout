var Brick = function(game, position) {
  this.game = game;
  this.center = position;
  this.size = {x: 87, y: 15};
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