const chai = require('chai');
const assert = chai.assert;

const Ball = require('../lib/balls');
const Game = require('../lib/game');
const Paddle = require('../lib/paddle');
const Brick = require('../lib/brick');
const Location = require('../lib/location.js');

describe('location', function () {

  beforeEach(function() {
    this.game = new Game();
    this.paddle = new Paddle(this.game);
    this.brick = new Brick(this.game);
    this.ball = new Ball(this.game, this.paddle, this.brick);
  });

  it('should recognize the outterLeft of the paddle', function () {
    this.ball.x = 50
    this.paddle.position.x = 40
    assert.equal(Location.outterLeft(this.ball), true);
  });

  it('should recognize the innerLeft of the paddle', function () {
    this.ball.x = 100
    this.paddle.position.x = 75
    assert.equal(Location.innerLeft(this.ball), true);
  });

  it('should recognize the centerLeft of the paddle', function () {
    this.ball.x = 150
    this.paddle.position.x = 90
    assert.equal(Location.centerLeft(this.ball), true);
  });

  it('should recognize the centerRight of the paddle', function () {
    this.ball.x = 130
    this.paddle.position.x = 40
    assert.equal(Location.centerRight(this.ball), true);
  });

  it('should recognize the innerRight of the paddle', function () {
    this.ball.x = 150
    this.paddle.position.x = 40
    assert.equal(Location.innerRight(this.ball), true);
  });

  it('should recognize the outterRight of the paddle', function () {
    this.ball.x = 180
    this.paddle.position.x = 40
    assert.equal(Location.outterRight(this.ball), true);
  });
});