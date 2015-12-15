var Paddle = function(game) {
  this.game = game;
  this.size = { x: 150, y: 15 };
  this.gameSize = {x: this.game.size.x, y: this.game.size.y}
  this.position = { x: this.game.size.x/2-75, y: this.game.size.y-15 };
  this.keyboarder = new Keyboarder();
}

Paddle.prototype = {

  draw: function(canvas) {
    canvas.beginPath();
    canvas.rect(this.position.x, this.position.y, this.size.x, this.size.y )
    canvas.fillStyle = "#D03ACD";
    canvas.fill();
    canvas.closePath();
  },

  move: function() {
    var paddle_move_speed = 12

    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && (this.position.x > 0)) {
      this.position.x -= paddle_move_speed;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && (this.position.x < this.gameSize.x-this.size.x)) {
      this.position.x += paddle_move_speed;
    }
  }
}

var Keyboarder = function() {
  var keyState = {};
  document.addEventListener('keydown', function(e) {
    keyState[e.keyCode] = true;
  });

  document.addEventListener('keyup', function(e) {
    keyState[e.keyCode] = false;
  });

  this.isDown = function(keyCode) {
    return keyState[keyCode] === true;
  };

  this.KEYS = { LEFT: 37, RIGHT: 39 };
};

module.exports = Paddle;