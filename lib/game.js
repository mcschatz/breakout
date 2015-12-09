const Ball = require('../lib/balls');

;(function(){
  var Game = function(){
    var canvas = document.getElementById("canvas").getContext('2d');
    this.size = { x: screen.canvas.width, y: screen.canvas.height };
    this.bodies = new Ball(this);
  };
});