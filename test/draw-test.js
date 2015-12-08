const chai = require('chai');
const assert = chai.assert;

const Draw = require('../lib/draw');
const Ball = require('../lib/balls');
const Canvas = require('../lib/canvas');


describe('draw', function () {

  beforeEach(function() {
    this.ball = new Ball();
    this.canvas = document.createElement('canvas')
                 .getContext('2d')
  });

  it('should instantiate a new draw', function () {
    let draw = new Draw(this.ball, this.canvas);

    assert.isObject(draw);
  });
});

