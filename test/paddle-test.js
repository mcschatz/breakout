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
    assert.equal(paddle.size.x, 100);
  });

  it('should have a height', function(){
    let paddle = new Paddle(this.game);
    assert.equal(paddle.size.y, 15);
  });

  it('should have an x-coordinate center', function(){
    let paddle = new Paddle(this.game);
    assert.equal(paddle.center.x, 341);
  });

  it('should have an y-coordinate center', function(){
    let paddle = new Paddle(this.game);
    assert.equal(paddle.center.y, 505);
  });
});