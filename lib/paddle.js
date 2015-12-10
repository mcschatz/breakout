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
  },

  move: function() {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 10;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 10;
    }
  }
}

var Keyboarder = function() {
  var keyState = {};
  window.addEventListener('keydown', function(e) {
    keyState[e.keyCode] = true;
  });

  window.addEventListener('keyup', function(e) {
    keyState[e.keyCode] = false;
  });

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };

  this.KEYS = { LEFT: 37, RIGHT: 39 };
};

module.exports = Paddle;