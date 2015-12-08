const chai = require('chai');
const assert = chai.assert;

const Ball = require('../lib/balls');

describe('balls', function () {

  it('should instatiate a new ball', function () {
    let ball = new Ball();
    assert.isObject(ball);
  });

  it('should have a X-coordinate', function () {
    let ball = new Ball(3, 4, 20, 29);
    assert.equal(ball.x, 3);
  });

  it('should have a Y-coordinate', function(){
    let ball = new Ball(3, 4, 20, 29);
    assert.equal(ball.y, 4);
  });

  it('should have a radius', function(){
    let ball = new Ball(3, 4, 20, 29);
    assert.equal(ball.radius, 20);
  });

  it('should have a startAngle', function(){
    let ball = new Ball(3, 4, 20, 29);
    assert.equal(ball.startAngle, 29);
  });
});