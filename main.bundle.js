/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Start = __webpack_require__(1);

	new Start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Game = __webpack_require__(2);

	var Start = function Start() {

	  if (document.getElementById('canvas')) {
	    var canvasId = document.getElementById("canvas");
	    var canvas = document.getElementById('canvas').getContext('2d');
	  } else {
	    var canvasId = document.createElement('canvas');
	    canvasId.width = 782;
	    canvasId.height = 520;
	    var canvas = canvasId.getContext('2d');
	  }

	  this.size = { x: canvas.canvas.width, y: canvas.canvas.height };
	  this.themeSound = document.getElementById("theme-sound");
	  this.themeSound.load();
	  this.themeSound.play();

	  var self = this;
	  var start = function start(canvas, canvasId) {
	    self.draw(canvas);
	    self.begin(canvasId, self);
	  };
	  start(canvas, canvasId);
	};

	Start.prototype = {

	  draw: function draw(canvas) {
	    var y = this.size.y / 3;

	    function centerText(canvas, text, y) {
	      var measurement = canvas.measureText(text);
	      var x = (canvas.canvas.width - measurement.width) / 2;
	      canvas.fillText(text, x, y);
	    }

	    canvas.clearRect(0, 0, this.size.x, this.size.y);
	    canvas.fillStyle = 'white';
	    canvas.font = '48px monospace';
	    centerText(canvas, 'Break Out', y);

	    canvas.fillStyle = "white";
	    canvas.font = '24px monospace';
	    centerText(canvas, 'Click Anywhere to Begin!', y + 40);
	  },

	  begin: function begin(canvasId, self) {

	    canvasId.addEventListener('click', function game() {
	      new Game();
	      function theme(self) {
	        self.themeSound.volume = 1.00;
	        for (var i = 0; i < 10; i++) {
	          setTimeout((function (x) {
	            return function () {
	              self.themeSound.volume = self.themeSound.volume - 0.082;
	            };
	          })(i), 1000 * i);
	        };
	      }

	      theme(self);
	      canvasId.removeEventListener('click', game);
	    });
	  }
	};

	module.exports = Start;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Ball = __webpack_require__(3);
	var Paddle = __webpack_require__(6);
	var Brick = __webpack_require__(7);
	var Colors = __webpack_require__(8);
	var Canvas = __webpack_require__(4);

	var Game = function Game() {
	  var canvas = new Canvas();

	  this.size = { x: canvas.canvas.width, y: canvas.canvas.height };
	  var paddle = new Paddle(this);
	  var bricks = createBricks(this);

	  this.bodies = bricks.concat(createBall(this, paddle, bricks)).concat(paddle);
	  this.score = 0;
	  this.lives = 3;
	  this.status = true;

	  var tick = (function () {
	    this.move();
	    this.draw(canvas);
	    this.drawScore(canvas);
	    this.drawLives(canvas);
	    requestAnimationFrame(tick);
	  }).bind(this);
	  tick();
	};

	var createBall = function createBall(game, paddle, bricks) {
	  var ball = [];
	  ball.push(new Ball(game, paddle, bricks));
	  return ball;
	};

	var createBricks = function createBricks(game) {
	  var bricks = [];
	  for (var i = 0; i < 54; i++) {
	    var x = Math.floor(i / 6) * 87;
	    var y = 70 + i % 6 * 18;
	    bricks.push(new Brick(game, { x: x, y: y }));
	  };
	  return bricks;
	};

	Game.prototype = {

	  move: function move() {
	    if (!this.status) {
	      return;
	    }
	    for (var i = 0; i < this.bodies.length; i++) {
	      if (this.bodies[i].move !== undefined) {
	        this.bodies[i].move();
	      }
	    }
	  },

	  draw: function draw(canvas) {
	    canvas.clearRect(0, 0, this.size.x, this.size.y);
	    var colorList = new Colors();
	    for (var i = 0; i < this.bodies.length; i++) {
	      if (this.bodies[i].draw !== undefined) {
	        this.bodies[i].draw(canvas, colorList[i].toString());
	      }
	    }
	  },

	  drawScore: function drawScore(canvas) {
	    canvas.font = '16px monospace';
	    canvas.fillStyle = "#0095DD ";
	    canvas.fillText("Score: " + this.score, 8, 20);
	  },

	  drawLives: function drawLives(canvas) {
	    canvas.font = '16px monospace';
	    canvas.fillStyle = "#0095DD ";
	    canvas.fillText("Lives: " + this.lives, 700, 20);
	  }
	};

	module.exports = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Canvas = __webpack_require__(4);
	var Sounds = __webpack_require__(5);

	var Ball = function Ball(game, paddle, bricks) {
	  var canvas = new Canvas().canvas;
	  this.game = game;
	  this.paddle = paddle;
	  this.startAngle = 0;
	  this.x = canvas.width / 2;
	  this.y = canvas.height - 25;
	  this.canvasHeightOffset = 8;
	  this.radius = 10;
	  this.gameSize = { x: this.game.size.x, y: this.game.size.y };
	  this.bricks = bricks;
	  this.dy = 10;
	  this.sounds = new Sounds();
	};

	Ball.prototype = {

	  draw: function draw(canvas) {
	    canvas.beginPath();
	    canvas.arc(this.x, this.y, this.radius, this.startAngle, Math.PI * 2);
	    canvas.fillStyle = "#F00000";
	    canvas.fill();
	    canvas.closePath();
	  },

	  setLeftSlope: function setLeftSlope() {
	    this.dx = -13;
	    this.dy = -8;
	  },

	  setLeftCenterSlope: function setLeftCenterSlope() {
	    this.dx = -11;
	    this.dy = -9;
	  },

	  setLeftCenterCenterSlope: function setLeftCenterCenterSlope() {
	    this.dx = -10;
	    this.dy = -10;
	  },

	  setRightCenterCenterSlope: function setRightCenterCenterSlope() {
	    this.dx = 10;
	    this.dy = -10;
	  },

	  setRightCenterSlope: function setRightCenterSlope() {
	    this.dx = 11;
	    this.dy = -9;
	  },

	  setRightSlope: function setRightSlope() {
	    this.dx = 13;
	    this.dy = -8;
	  },

	  setPaddleSound: function setPaddleSound() {
	    this.sounds.paddleSound.load();
	    this.sounds.paddleSound.play();
	  },

	  setWallSound: function setWallSound() {
	    this.sounds.wallSound.load();
	    this.sounds.wallSound.play();
	  },

	  setTopSound: function setTopSound() {
	    this.sounds.topSound.load();
	    this.sounds.topSound.play();
	  },

	  setDeathSound: function setDeathSound() {
	    this.sounds.deathSound.load();
	    this.sounds.deathSound.play();
	  },

	  setBrickSound: function setBrickSound() {
	    this.sounds.brickSound.load();
	    this.sounds.brickSound.play();
	  },

	  setWinSound: function setWinSound() {
	    this.sounds.winSound.load();
	    this.sounds.winSound.play();
	  },

	  move: function move() {
	    this.collisionDetectionBricks();
	    this.collisionDetectionWalls();

	    if (this.y + this.dy > this.gameSize.y - this.radius * 2) {
	      this.collisionDetectionPaddle();
	    }

	    this.x += this.dx;
	    this.y += this.dy;
	  },

	  collisionDetectionPaddle: function collisionDetectionPaddle() {
	    if (this.x >= this.paddle.position.x - 4 && this.x <= this.paddle.position.x + 24) {
	      this.setPaddleSound();
	      this.setLeftSlope();
	    }
	    if (this.x >= this.paddle.position.x + 25 && this.x <= this.paddle.position.x + 49) {
	      this.setPaddleSound();
	      this.setLeftCenterSlope();
	    }
	    if (this.x >= this.paddle.position.x + 50 && this.x <= this.paddle.position.x + 74) {
	      this.setPaddleSound();
	      this.setLeftCenterCenterSlope();
	    }
	    if (this.x >= this.paddle.position.x + 75 && this.x <= this.paddle.position.x + 99) {
	      this.setPaddleSound();
	      this.setRightCenterCenterSlope();
	    }
	    if (this.x >= this.paddle.position.x + 100 && this.x <= this.paddle.position.x + 124) {
	      this.setPaddleSound();
	      this.setRightCenterSlope();
	    }
	    if (this.x >= this.paddle.position.x + 125 && this.x <= this.paddle.position.x + 154) {
	      this.setPaddleSound();
	      this.setRightSlope();
	    }
	    if (this.x < this.paddle.position.x - 4 || this.x > this.paddle.position.x + 154) {
	      this.updateGame();
	    }
	  },

	  // conditions = { paddleAtBottom: //  }

	  updateGame: function updateGame() {
	    this.game.lives -= 1;
	    var lives = this.game.lives;

	    if (lives > 0) {
	      this.pause();
	      this.resetGame();

	      setTimeout((function () {
	        this.game.status = true;
	        this.dy = 10;
	      }).bind(this), 2000);
	    } else {
	      this.loseGame();
	    }
	  },

	  pause: function pause() {
	    this.dx = 0;
	    this.dy = 0;
	    this.game.status = false;
	  },

	  resetGame: function resetGame() {
	    this.startAngle = 0;
	    this.x = canvas.width / 2;
	    this.y = canvas.height - 25;
	    this.paddle.position = { x: this.game.size.x / 2 - 75, y: this.game.size.y - 15 };
	  },

	  showText: function showText(target, message, index, interval) {
	    if (index < message.length) {
	      $(target).append(message[index++]);
	      var self = this;
	      setTimeout(function () {
	        self.showText(target, message, index, interval);
	      }, interval);
	    }
	  },

	  winGame: function winGame() {
	    this.sounds.themeSound.volume = 0.00;
	    this.displayStyles('winning', 'inline');
	    this.setWinSound();
	    this.showText("#won-title", "Congratulations You Won!", 0, 150);
	    this.showText("#final-score", "Final Score: " + this.game.score, 0, 150);
	    this.getId('restart').onclick = function () {
	      document.location.reload();
	    };
	  },

	  loseGame: function loseGame() {
	    this.dy = 0;
	    this.sounds.themeSound.volume = 0.00;
	    this.sounds.wallSound.volume = 0.00;
	    this.displayStyles('losing', 'inline');
	    this.setDeathSound();
	    this.showText("#lose-title", "Sorry, you died!", 0, 150);
	    this.showText("#final-score-lose", "Final Score: " + this.game.score, 0, 150);
	    this.getId('restart-lose').onclick = function () {
	      document.location.reload();
	    };
	  },

	  displayStyles: function displayStyles(location, style) {
	    document.getElementById(location).style.display = style;
	  },

	  getId: function getId(id) {
	    return document.getElementById(id);
	  },

	  collisionDetectionBricks: function collisionDetectionBricks() {
	    var self = this;
	    var brickHeight = self.bricks[0].size.y;
	    var brickWidth = self.bricks[0].size.x;

	    for (var i = 0; i < self.bricks.length; i++) {
	      if (self.x > self.bricks[i].position.x && self.x < self.bricks[i].position.x + brickWidth && self.y - self.radius < self.bricks[i].position.y + brickHeight && self.y + self.radius > self.bricks[i].position.y - brickHeight) {
	        this.setBrickSound();
	        this.dy = -this.dy;
	        self.bricks[i].status = 0;
	        self.bricks.splice(i, 1);

	        if (self.bricks.length === 0) {
	          self.game.score += 10;
	          this.winGame();
	        } else {
	          self.game.score += 10;
	          return this.dy;
	        }
	      }
	    }
	  },

	  collisionDetectionWalls: function collisionDetectionWalls() {
	    var self = this;

	    if (self.x + self.dx > self.gameSize.x - self.radius || self.x + self.dx < self.radius) {
	      self.setWallSound();
	      self.dx = -self.dx;
	    }

	    if (self.y - self.canvasHeightOffset + self.dy < self.radius) {
	      self.setTopSound();
	      self.dy = -self.dy;
	    }
	  }
	};

	module.exports = Ball;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var Canvas = function Canvas() {
	    if (document.getElementById('canvas')) {
	        var canvas = document.getElementById('canvas').getContext('2d');
	        return canvas;
	    } else {
	        var context = document.createElement('canvas');
	        context.width = 782;
	        context.height = 520;
	        var canvas = context.getContext('2d');
	        return canvas;
	    }
	};

	module.exports = Canvas;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var Sounds = function Sounds() {
	  this.paddleSound = document.getElementById("paddle-sound");
	  this.topSound = document.getElementById("top-sound");
	  this.wallSound = document.getElementById("wall-sound");
	  this.deathSound = document.getElementById("death-sound");
	  this.brickSound = document.getElementById("bricks-sound");
	  this.winSound = document.getElementById("win-sound");
	  this.themeSound = document.getElementById("theme-sound");
	};

	module.exports = Sounds;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var Paddle = function Paddle(game) {
	  this.game = game;
	  this.size = { x: 150, y: 15 };
	  this.gameSize = { x: this.game.size.x, y: this.game.size.y };
	  this.position = { x: this.game.size.x / 2 - 75, y: this.game.size.y - 15 };
	  this.keyboarder = new Keyboarder();
	};

	Paddle.prototype = {

	  draw: function draw(canvas) {
	    canvas.beginPath();
	    canvas.rect(this.position.x, this.position.y, this.size.x, this.size.y);
	    canvas.fillStyle = "#D03ACD";
	    canvas.fill();
	    canvas.closePath();
	  },

	  move: function move() {
	    var paddle_move_speed = 19;

	    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && this.position.x > 0) {
	      this.position.x -= paddle_move_speed;
	    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && this.position.x < this.gameSize.x - this.size.x) {
	      this.position.x += paddle_move_speed;
	    }
	  }
	};

	var Keyboarder = function Keyboarder() {
	  var keyState = {};
	  document.addEventListener('keydown', function (e) {
	    keyState[e.keyCode] = true;
	  });

	  document.addEventListener('keyup', function (e) {
	    keyState[e.keyCode] = false;
	  });

	  this.isDown = function (keyCode) {
	    return keyState[keyCode] === true;
	  };

	  this.KEYS = { LEFT: 37, RIGHT: 39 };
	};

	module.exports = Paddle;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var Brick = function Brick(game, position) {
	  this.game = game;
	  this.position = position;
	  this.size = { x: 87, y: 18 };
	  this.status = 1;
	};

	Brick.prototype = {

	  draw: function draw(canvas, color) {
	    if (this.status === 1) {
	      canvas.beginPath();
	      canvas.rect(this.position.x, this.position.y, this.size.x, this.size.y);
	      canvas.fillStyle = color;
	      canvas.fill();
	      canvas.closePath();
	    }
	  }
	};

	module.exports = Brick;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	var Colors = function Colors() {
	  var colorWheel = [];
	  for (var i = 0; i < 10; i++) {
	    if (i < 10) {
	      colorWheel.push("#CC3ED0");
	      colorWheel.push("#F95255");
	      colorWheel.push("#FE801A");
	      colorWheel.push("#FF911B");
	      colorWheel.push("#10AC24");
	      colorWheel.push("#6667FF");
	    }
	  };
	  return colorWheel;
	};

	module.exports = Colors;

/***/ }
/******/ ]);