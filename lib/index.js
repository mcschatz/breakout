const Ball = require('./balls.js');
const Draw = require('./draw.js');
const Canvas = require('./canvas.js');

var ctx  = new Canvas();
var ball = new Ball();

new Draw(ball, ctx)


