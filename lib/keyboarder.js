var rightPressed = false;
var leftPressed = false;

var Keyboarder = function() {
  document.addEventListener('keydown', this.keyDownHandler, false);
  document.addEventListener('keyup', this.keyUpHandler, false);
}

Keyboarder.prototype = {

  keyDownHandler: function(event) {
    if(event.keyCode === 39) {
      rightPressed = true;
    } else if(event.keyCode === 37) {
      leftPressed = true;
    }
  },

  keyUpHandler: function(event) {
    if(event.keyCode === 39) {
      rightPressed = false;
    } else if(event.keyCode === 37) {
      leftPressed = false;
    }
  }
}

module.exports = Keyboarder;