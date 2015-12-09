if (document.getElementById('canvas')){
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
} else {
  var canvas = document.createElement('canvas');
  canvas.height = 960;
  canvas.width = 640;
  var context = canvas.getContext('2d');
}

var Ball = function(game){
  this.game = game;
  this.x = canvas.width/2;
  this.y = canvas.height-600;
  this.radius = 10;
  this.startAngle = 0;
}

Ball.prototype = {

  draw: function(canvas) {
    canvas.beginPath();
    canvas.arc(this.x, this.y, this.radius, this.startAngle, Math.PI*2);
    canvas.fillStyle = "#F00000";
    canvas.fill();
    canvas.closePath();
  },

  move: function () {
    if(this.y < this.game.size.y) {
      this.y += 2;
    } else {
      console.log("huh?")
      this.y -= 2;
    }
    // this.x += -2;
    return this;
  }
};

module.exports = Ball;