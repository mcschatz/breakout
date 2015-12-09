const Ball = require('../lib/balls');

var Game = function(){
  var canvas = document.getElementById("canvas").getContext('2d');
  this.size = { x: canvas.canvas.width, y: canvas.canvas.height };
  this.bodies = new Ball(this);

  var self = this;
  var tick = function() {
    self.move();
    self.draw(canvas);
    requestAnimationFrame(tick);
  };
  tick();
};

Game.prototype = {

  move: function() {
    this.bodies.move();
  },

  draw: function(canvas) {
    canvas.clearRect(0, 0, this.size.x, this.size.y);
    this.bodies.draw(canvas);
  }
}

module.exports = Game;