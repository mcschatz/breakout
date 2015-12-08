const Ball = require('./balls.js');
const Draw = require('./draw.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ball = new Ball();
new Draw(ball, ctx)


