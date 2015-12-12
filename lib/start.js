const Game = require('./game');

var Start = function() {
  var canvasId = document.getElementById("canvas")
  var canvas = document.getElementById("canvas").getContext('2d');
  this.size = { x: canvas.canvas.width, y: canvas.canvas.height };

  var self = this;
  var start = function(canvas, canvasId){
    self.draw(canvas);
    self.begin(canvasId);
  };
  start(canvas, canvasId);
};

Start.prototype = {

  draw: function(canvas) {
    var y = canvas.canvas.height / 2;

    function centerText(canvas, text, y) {
      var measurement = canvas.measureText(text);
      var x = (canvas.canvas.width - measurement.width) / 2;
      canvas.fillText(text, x, y);
    }

    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.fillStyle = 'white';
    canvas.font = '48px monospace';
    centerText(canvas, 'Break Out', y);

    canvas.fillStyle = "white";
    canvas.font = '24px monospace';
    centerText(canvas, 'Click Anywhere to Begin!', y + 40);
  },

  begin: function(canvasId) {
    canvasId.addEventListener('click', function game() {
      new Game();
      canvasId.removeEventListener('click', game);
    });
  }
}

module.exports = Start;