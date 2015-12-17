const chai = require('chai');
const assert = chai.assert;

const Game = require('../lib/game.js');
const Paddle = require('../lib/paddle.js');


describe('paddle', function () {

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
});