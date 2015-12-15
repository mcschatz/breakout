const chai = require('chai');
const assert = chai.assert;

const Sounds = require('../lib/sounds.js');

describe('sounds', function () {

  it('should instaniate a new sound class', function () {
    let sounds = new Sounds();
    assert.isObject(sounds);
  });

  it('should have a paddle sound', function () {
    let sounds = new Sounds();
    assert(sounds.paddleSound, '<audio id="paddle-sound" src="./sounds/paddle.mp3"></audio>');
  });

  it('should have a top sound', function () {
    let sounds = new Sounds();
    assert(sounds.topSound, '<audio id="top-sound" src="./sounds/top.mp3"></audio>');
  });

  it('should have a wall sound', function () {
    let sounds = new Sounds();
    assert(sounds.wallSound, '<audio id="wall-sound" src="./sounds/wall.mp3"></audio>');
  });

  it('should have a death sound', function () {
    let sounds = new Sounds();
    assert(sounds.deathSound, '<audio id="death-sound" src="./sounds/death.wav"></audio>');
  });
});