var Sounds = function(){
  this.paddleSound = document.getElementById("paddle-sound");
  this.topSound = document.getElementById("top-sound");
  this.wallSound = document.getElementById("wall-sound");
  this.deathSound = document.getElementById("death-sound");
  this.brickSound = document.getElementById("brick-sound");
  this.themeSound = document.getElementById("theme-sound");
}

module.exports = Sounds;