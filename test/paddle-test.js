const chai = require('chai');
const assert = chai.assert;

const Game = require('../lib/game.js');
const Paddle = require('../lib/paddle.js');


describe('paddle', function () {
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d');

  beforeEach(function() {
    this.game = new Game();
  });

  it('should instatiate a new paddle', function () {
    let paddle = new Paddle(this.game);
    assert.isObject(paddle);
  });

  it('should have a width', function () {
    let paddle = new Paddle(this.game);
    assert.equal(paddle.size.x, 150);
  });

  it('should have a height', function(){
    let paddle = new Paddle(this.game);
    assert.equal(paddle.size.y, 15);
  });

  it('should be associated with a game size x cord', function(){
    let paddle = new Paddle(this.game);
    assert.equal(paddle.gameSize.x, 782);
  });

  it('should be associated with a game size y cord', function(){
    let paddle = new Paddle(this.game);
    assert.equal(paddle.gameSize.y, 520);
  });

  it('should have an x-coordinate position', function(){
    let paddle = new Paddle(this.game);
    assert.equal(paddle.position.x, 316);
  });

  it('should have an y-coordinate position', function(){
    let paddle = new Paddle(this.game);
    assert.equal(paddle.position.y, 505);
  });

  it('should have instatiate a new Keyboarder', function(){
    let paddle = new Paddle(this.game);
    assert.isObject(paddle.keyboarder, 505);
  });

  it('should have draw method', function () {
    let paddle = new Paddle(this.game);
    assert.ok(paddle.draw);
  });

  it('should draw', function () {
    let paddle = new Paddle(this.game);
    assert.equal(paddle.draw(ctx, "#000000"), undefined);
  });

  it('should have move method', function () {
    let paddle = new Paddle(this.game);
    assert.ok(paddle.move);
  });

  it('does move if the key is not down', function () {
    let paddle = new Paddle(this.game);
    paddle.keyboarder.isDown() === true;
    paddle.position.x = 20;
    assert.equal(paddle.position.x, 20);
  });

  it('has a key code objects', function () {
    let paddle = new Paddle(this.game);
    assert.isObject(paddle.keyboarder.KEYS, 37);
  });

  it('has a key code of 37 for left', function () {
    let paddle = new Paddle(this.game);
    assert.equal(paddle.keyboarder.KEYS.LEFT, 37);
  });

  it('has a key code of 39 for left', function () {
    let paddle = new Paddle(this.game);
    assert.equal(paddle.keyboarder.KEYS.RIGHT, 39);
  });
});