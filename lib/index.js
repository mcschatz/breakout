var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(75, 75, 10, 0, Math.PI*2, false);
ctx.fillStyle = "#F00000";
ctx.closePath();
ctx.fill();

