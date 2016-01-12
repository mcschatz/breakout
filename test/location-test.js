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
    this.ball.x = 50;
    this.paddle.position.x = 40;
    assert.equal(Location.change(this.ball, "outterLeft"), true);
  });

  it('should recognize the innerLeft of the paddle', function () {
    this.ball.x = 100;
    this.paddle.position.x = 75;
    assert.equal(Location.change(this.ball, "innerLeft"), true);
  });

  it('should recognize the centerLeft of the paddle', function () {
    this.ball.x = 150;
    this.paddle.position.x = 90;
    assert.equal(Location.change(this.ball, "centerLeft"), true);
  });

  it('should recognize the centerRight of the paddle', function () {
    this.ball.x = 130;
    this.paddle.position.x = 40;
    assert.equal(Location.change(this.ball, "centerRight"), true);
  });

  it('should recognize the innerRight of the paddle', function () {
    this.ball.x = 150;
    this.paddle.position.x = 40;
    assert.equal(Location.change(this.ball, "innerRight"), true);
  });

  it('should recognize the outterRight of the paddle', function () {
    this.ball.x = 180;
    this.paddle.position.x = 40;
    assert.equal(Location.change(this.ball, "outterRight"), true);
  });

  it('should recognize the sideWalls', function () {
    this.ball.x = 0;
    assert.equal(Location.sideWalls(this.ball), true);
  });

  it('should recognize the topWall', function () {
    this.ball.y = 0;
    assert.equal(Location.topWall(this.ball), true);
  });

  it('should recognize the bottomWall', function () {
    this.ball.y = 530;
    assert.equal(Location.bottomWall(this.ball), true);
  });

   it('should return false if it does not hit the outterLeft of the paddle', function () {
    this.ball.x = 100;
    this.paddle.position.x = 40;
    assert.equal(Location.change(this.ball, "outterLeft"), false);
  });

  it('should return false if it does not hit the innerLeft of the paddle', function () {
    this.ball.x = 10;
    this.paddle.position.x = 75;
    assert.equal(Location.change(this.ball, "innerLeft"), false);
  });

  it('should return false if it does not hit the centerLeft of the paddle', function () {
    this.ball.x = 15;
    this.paddle.position.x = 90;
    assert.equal(Location.change(this.ball, "centerLeft"), false);
  });

  it('should return false if it does not hit the centerRight of the paddle', function () {
    this.ball.x = 25;
    this.paddle.position.x = 40;
    assert.equal(Location.change(this.ball, "centerRight"), false);
  });

  it('should return false if it does not hit the innerRight of the paddle', function () {
    this.ball.x = 80;
    this.paddle.position.x = 40;
    assert.equal(Location.change(this.ball, "innerRight"), false);
  });

  it('should return false if it does not hit the outterRight of the paddle', function () {
    this.ball.x = 75;
    this.paddle.position.x = 40;
    assert.equal(Location.change(this.ball, "outterRight"), false);
  });

  it('should return false if it does not hit the sideWalls', function () {
    this.ball.x = 300;
    assert.equal(Location.sideWalls(this.ball), false);
  });

  it('should return false if it does not hit the topWall', function () {
    this.ball.y = 40;
    assert.equal(Location.topWall(this.ball), false);
  });

  it('should return false if it does not hit the bottomWall', function () {
    this.ball.y = 500;
    assert.equal(Location.bottomWall(this.ball), false);
  });
});