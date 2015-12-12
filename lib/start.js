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
    var y = this.size.y / 3;

    function centerText(canvas, text, y) {
      var measurement = canvas.measureText(text);
      var x = (canvas.canvas.width - measurement.width) / 2;
      canvas.fillText(text, x, y);
    }

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://fonts.googleapis.com/css?family=Press+Start+2P';
    document.getElementsByTagName('head')[0].appendChild(link);

    canvas.clearRect(0, 0, this.size.x, this.size.y);
    canvas.fillStyle = 'white';
    canvas.font = '48px "Press Start 2P"';
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