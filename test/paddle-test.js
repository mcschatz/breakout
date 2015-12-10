const chai = require('chai');
const assert = chai.assert;

const Game = require('../lib/game.js');
const Paddle = require('../lib/paddle.js');


describe('paddle', function () {

  beforeEach(function() {
    this.game = new Game();
  });

  it('should instatiate a new paddle', function () {
    let paddle = new Paddle();
    assert.isObject(paddle);
  });

  it('should have a height', function () {
    let paddle = new Paddle();
    assert.equal(paddle.height, 0);
  });

  it('should have a width', function(){
    let paddle = new Paddle();
    assert.equal(paddle.width, 0);
  });

  it('should have an x-coordinate', function(){
    let paddle = new Paddle();
    assert.equal(paddle.x, 0);
  });
});