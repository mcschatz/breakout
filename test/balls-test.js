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
    assert.equal(ball.x, 391);
  });

  it('should have a Y-coordinate', function(){
    let ball = new Ball(this.game, this.paddle, this.brick);
    assert.equal(ball.y, 495);
  });

  it('should have a radius', function(){
    let ball = new Ball(this.game, this.paddle, this.brick);
    assert.equal(ball.radius, 10);
  });

  it('should have a startAngle', function(){
    let ball = new Ball(this.game, this.paddle, this.brick);
    assert.equal(ball.startAngle, 0);
  });

  it('should have a velocity', function(){
    let ball = new Ball(this.game, this.paddle, this.brick);
    assert.equal(ball.dy, 10);
  });

  it('should have a gameSize', function(){
    let ball = new Ball(this.game, this.paddle, this.brick);
    assert.equal(ball.gameSize.x, 782);
    assert.equal(ball.gameSize.y, 520);
  });

  it('should update a ball direction based on where it hits the paddle', function(){
    let ball = new Ball(this.game, this.paddle, this.brick);
    assert.equal(ball.dx, -10);
    assert.equal(ball.dy, 10);

    ball.setLeftSlope();
    assert.equal(ball.dx, -13);
    assert.equal(ball.dy, -8);

    ball.setLeftCenterSlope();
    assert.equal(ball.dx, -11);
    assert.equal(ball.dy, -9);

    ball.setLeftCenterCenterSlope();
    assert.equal(ball.dx, -10);
    assert.equal(ball.dy, -10);

    ball.setRightCenterCenterSlope();
    assert.equal(ball.dx, 10);
    assert.equal(ball.dy, -10);

    ball.setRightCenterSlope();
    assert.equal(ball.dx, 11);
    assert.equal(ball.dy, -9);

    ball.setRightSlope();
    assert.equal(ball.dx, 13);
    assert.equal(ball.dy, -8);
  });
});









