const chai = require('chai');
const assert = chai.assert;

const Ball = require('../lib/balls');

describe('balls', function () {
  it('should instatiate a new ball', function () {
    let ball = new Ball();
    assert.isObject(ball);
  });
});