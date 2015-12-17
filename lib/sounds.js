module.exports = {

  paddleSound: function() {
    var paddleSound = document.getElementById("paddle-sound")
    paddleSound.load();
    paddleSound.play();
  },

  wallSound: function() {
    var wallSound = document.getElementById("wall-sound");
    wallSound.load();
    wallSound.play();
  },

  topSound: function() {
    var topSound = document.getElementById("top-sound");
    topSound.load();
    topSound.play();
  },

  deathSound: function() {
    var deathSound = document.getElementById("death-sound");
    deathSound.load();
    deathSound.play();
  },

  brickSound: function() {
    var brickSound = document.getElementById("bricks-sound");
    brickSound.load();
    brickSound.play();
  },

  winSound: function() {
    var winSound = document.getElementById("win-sound");
    winSound.load();
    winSound.play();
  },

  themeSound: function() {
    var themeSound = document.getElementById("theme-sound");
    themeSound.load();
    themeSound.play();
  }
}