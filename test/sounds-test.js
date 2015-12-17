const chai = require('chai');
const assert = chai.assert;

const Sounds = require('../lib/sounds.js');

describe('sounds', function () {

  it('should have a paddle sound', function () {
    assert.ok(Sounds.paddle);
  });

  it('should have a wall sound', function () {
    assert.ok(Sounds.wall);
  });

  it('should have a top sound', function () {
    assert.ok(Sounds.top);
  });

  it('should have a death sound', function () {
    assert.ok(Sounds.death);
  });

  it('should have a brick sound', function () {
    assert.ok(Sounds.brick);
  });

  it('should have a win sound', function () {
    assert.ok(Sounds.win);
  });

  it('should have a theme sound', function () {
    assert.ok(Sounds.theme);
  });

  it('should have a stopTheme sound', function () {
    assert.ok(Sounds.stopTheme);
  });
});