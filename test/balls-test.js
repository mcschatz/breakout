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
    this.ball = new Ball(this.game, this.paddle, this.brick);
  });

  it('should instatiate a new ball', function () {
    assert.isObject(this.ball);
  });

  it('should have a X-coordinate', function () {
    assert.equal(this.ball.x, 391);
  });

  it('should have a Y-coordinate', function(){
    assert.equal(this.ball.y, 495);
  });

  it('should have a radius', function(){
    assert.equal(this.ball.radius, 10);
  });

  it('should have a startAngle', function(){
    assert.equal(this.ball.startAngle, 0);
  });

  it('should have a velocity', function(){
    assert.equal(this.ball.dy, 10);
  });

  it('should have a gameSize', function(){
    assert.equal(this.ball.gameSize.x, 782);
    assert.equal(this.ball.gameSize.y, 520);
  });

  it('should update a ball direction based on where it hits the paddle', function(){
    assert.equal(this.ball.dx, -10);
    assert.equal(this.ball.dy, 10);

    this.ball.setLeftSlope();
    assert.equal(this.ball.dx, -13);
    assert.equal(this.ball.dy, -8);

    this.ball.setLeftCenterSlope();
    assert.equal(this.ball.dx, -11);
    assert.equal(this.ball.dy, -9);

    this.ball.setLeftCenterCenterSlope();
    assert.equal(this.ball.dx, -10);
    assert.equal(this.ball.dy, -10);

    this.ball.setRightCenterCenterSlope();
    assert.equal(this.ball.dx, 10);
    assert.equal(this.ball.dy, -10);

    this.ball.setRightCenterSlope();
    assert.equal(this.ball.dx, 11);
    assert.equal(this.ball.dy, -9);

    this.ball.setRightSlope();
    assert.equal(this.ball.dx, 13);
    assert.equal(this.ball.dy, -8);
  });

  it('should detect a right wall collision', function(){
    this.ball.x = 800
    assert.equal(this.ball.dx, -10);

    this.ball.collisionDetectionWalls();
    assert.equal(this.ball.dx, 10);
  });

  it('should detect a left wall collision', function(){
    this.ball.x = 0
    assert.equal(this.ball.dx, -10);

    this.ball.collisionDetectionWalls();
    assert.equal(this.ball.dx, 10);
  });

  it('should detect a top wall collision', function(){
    this.ball.y = 0
    assert.equal(this.ball.dy, 10);

    this.ball.collisionDetectionWalls();
    assert.equal(this.ball.dx, -10);
  });
});









