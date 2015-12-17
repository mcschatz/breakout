module.exports = {

  paddle: function() {
    var paddleSound = document.getElementById("paddle-sound");
    paddleSound.load();
    paddleSound.play();
  },

  wall: function() {
    var wallSound = document.getElementById("wall-sound");
    wallSound.load();
    wallSound.play();
  },

  top: function() {
    var topSound = document.getElementById("top-sound");
    topSound.load();
    topSound.play();
  },

  death: function() {
    var deathSound = document.getElementById("death-sound");
    deathSound.load();
    deathSound.play();
  },

  brick: function() {
    var brickSound = document.getElementById("bricks-sound");
    brickSound.load();
    brickSound.play();
  },

  win: function() {
    var winSound = document.getElementById("win-sound");
    winSound.load();
    winSound.play();
  },

  theme: function() {
    var themeSound = document.getElementById("theme-sound");
    themeSound.volume = 0.45
    themeSound.load();
    themeSound.play();
  },

  stopTheme: function() {
    var themeSound = document.getElementById("theme-sound");
    themeSound.load();
    themeSound.pause();
  },
}