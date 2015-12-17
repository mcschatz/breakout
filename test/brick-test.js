const chai = require('chai');
const assert = chai.assert;

const Brick = require('../lib/brick');
const Game = require('../lib/game');

describe('bricks', function () {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  beforeEach(function() {
    this.game = new Game();
  });

  it('should instatiate a new brick', function () {
    let brick = new Brick(this.game, {x: 100, y: 50} );
    assert.isObject(brick);
  });

  it('should be associated with a game', function () {
    let brick = new Brick(this.game, {x: 100, y: 50} );
    assert.equal(brick.game, this.game);
  });

  it('should have a position consisting of an x cord', function () {
    let brick = new Brick(this.game, {x: 100, y: 50} );
    assert.equal(brick.position.x, 100);
  });

  it('should have a position consisting of an y cord', function () {
    let brick = new Brick(this.game, {x: 100, y: 50} );
    assert.equal(brick.position.y, 50);
  });

  it('should have status of defaulting to one', function () {
    let brick = new Brick(this.game, {x: 100, y: 50} );
    assert.equal(brick.status, 1);
  });

  it('should have draw method', function () {
    let brick = new Brick(this.game, {x: 100, y: 50} );
    assert.ok(brick.draw);
  });

  it('should draw method', function () {
    let brick = new Brick(this.game, {x: 100, y: 50} );
    assert.equal(brick.draw(ctx, "#000000"), undefined);
  });
});