var Paddle = function(game) {
  this.game = game;
  this.size = { x: 20, y: 15 };
  this.center = { x: this.game.size.x/2, y: this.game.size.y-625 };
  this.keyboarder = new Keyboarder();
}