const chai = require('chai');
const assert = chai.assert;

const Ball = require('../lib/balls');
const Game = require('../lib/game.js');

describe('balls', function () {

  beforeEach(function() {
    this.game = new Game();
  });

  it('should instatiate a new ball', function () {
    let ball = new Ball(this.game);
    assert.isObject(ball);
  });

  it('should have a X-coordinate', function () {
    let ball = new Ball(this.game);
    assert.equal(ball.x, 391);
  });

  it('should have a Y-coordinate', function(){
    let ball = new Ball(this.game);
    assert.equal(ball.y, 490);
  });

  it('should have a radius', function(){
    let ball = new Ball(this.game);
    assert.equal(ball.radius, 10);
  });

  it('should have a startAngle', function(){
    let ball = new Ball(this.game);
    assert.equal(ball.startAngle, 0);
  });
});