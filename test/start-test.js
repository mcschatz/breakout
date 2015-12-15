const chai = require('chai');
const assert = chai.assert;

const Start = require('../lib/start');

describe('start', function () {

  it('should instatiate a new start', function () {
    let start = new Start();
    assert.isObject(start);
  });

  it('should have an annoying theme song', function () {
    let start = new Start();
    assert.ok(start.themeSound);
  });
});