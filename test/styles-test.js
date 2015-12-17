const chai = require('chai');
const assert = chai.assert;

const Game = require('../lib/game.js');
const Styles = require('../lib/styles.js');
const Paddle = require('../lib/paddle.js');


describe('styles', function () {

  it('should be a module', function () {
    let styles = Styles
  });

  it('sets the style', function(){
    let styles = Styles.displayStyles('winning', 'inline');
    let id = Styles.getId("winning");
    assert.ok(id)
  });

  it('gets the Id', function(){
    let styles = Styles.getId("winning");
    assert.ok(styles);
  });

  it('should return a message', function () {
    let styles = Styles.showText("#won-title", "Hi Steve!", 0, 150);
    let id = Styles.getId("won-title");
  });
});