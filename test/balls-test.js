const chai = require('chai');
const assert = chai.assert;

const Ball = require('../lib/balls');
const Game = require('../lib/game');
const Paddle = require('../lib/paddle');
const Brick = require('../lib/brick');

describe('balls', function () {

  beforeEach(function() {
    this.game = new Game();
    this.paddle = new Paddle(this.game);
    this.brick = new Brick(this.game);
  });

  it('should instatiate a new ball', function () {
    let ball = new Ball(this.game, this.paddle, this.brick);
    assert.isObject(ball);
  });

  it('should have a X-coordinate', function () {
    let ball = new Ball(this.game, this.paddle, this.brick);
    // let ball = new Ball(this.game);
    assert.equal(ball.x, 391);
  });

  it('should have a Y-coordinate', function(){
    let ball = new Ball(this.game, this.paddle, this.brick);
    // let ball = new Ball(this.game);
    assert.equal(ball.y, 495);
  });

  it('should have a radius', function(){
    let ball = new Ball(this.game, this.paddle, this.brick);
    // let ball = new Ball(this.game);
    assert.equal(ball.radius, 10);
  });

  it('should have a startAngle', function(){
    let ball = new Ball(this.game, this.paddle, this.brick);
    // let ball = new Ball(this.game);
    assert.equal(ball.startAngle, 0);
  });
});