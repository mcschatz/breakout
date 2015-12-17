const chai = require('chai');
const assert = chai.assert;

const Styles = require('../lib/styles.js');

describe('styles', function () {

  it('should be a module', function () {
    let styles = Styles;
    assert.ok(styles);
  });

  it('sets the style', function(){
    let id = Styles.getId("winning");
    assert.ok(id);
  });

  it('gets the Id', function(){
    let styles = Styles.getId("winning");
    assert.ok(styles);
  });

  it('should return a message', function () {
    let id = Styles.getId("won-title");
    assert.ok(id);
  });
});