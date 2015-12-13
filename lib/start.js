const Game = require('./game');

var Start = function() {

  if (document.getElementById('canvas')){
    var canvasId = document.getElementById("canvas")
    var canvas = document.getElementById('canvas').getContext('2d');
  } else {
    var canvasId = document.createElement('canvas');
    canvasId.width = 782;
    canvasId.height = 520;
    var canvas = canvasId.getContext('2d');
  }

  this.size = { x: canvas.canvas.width, y: canvas.canvas.height };
  this.themeSound = document.getElementById("theme-sound");
  this.themeSound.load();
  this.themeSound.play();

  var self = this;
  var start = function(canvas, canvasId){
    self.draw(canvas);
    self.begin(canvasId, self);
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

    canvas.clearRect(0, 0, this.size.x, this.size.y);
    canvas.fillStyle = 'white';
    canvas.font = '48px monospace';
    centerText(canvas, 'Break Out', y);

    canvas.fillStyle = "white";
    canvas.font = '24px monospace';
    centerText(canvas, 'Click Anywhere to Begin!', y + 40);
  },

  begin: function(canvasId, self) {

    canvasId.addEventListener('click', function game() {
      new Game();
      function theme(self) {
        self.themeSound.volume = 1.00
        for (var i = 0; i < 10; i++) {
          setTimeout(function(x) {return function() { self.themeSound.volume = self.themeSound.volume - 0.082}; }(i), 1000*i)
        };
      }

      theme(self);
      canvasId.removeEventListener('click', game);
    });
  }
}


module.exports = Start;