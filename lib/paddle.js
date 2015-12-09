const Keyboarder = require('./keyboarder')

if (document.getElementById('canvas')){
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
} else {
  var canvas = document.createElement('canvas');
  canvas.height = 960;
  canvas.width = 640;
  var context = canvas.getContext('2d');
}

var Paddle = function(game) {
  this.game = game;
  this.size = { x: 100, y: 15 };
  this.center = { x: this.game.size.x/2-50, y: this.game.size.y-15 };
  this.keyboarder = new Keyboarder();
}

Paddle.prototype = {

  draw: function(canvas) {
    canvas.beginPath();
    canvas.rect(this.center.x, this.center.y, this.size.x, this.size.y )
    canvas.fillStyle = "#F00000";
    canvas.fill();
    canvas.closePath();
  }
}

module.exports = Paddle;