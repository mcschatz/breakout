module.exports = {

  outterLeft: function(ball) {
    if((ball.x >= ball.paddle.position.x - ball.radius) && (ball.x <= ball.paddle.position.x + 24)) {
      return true;
    } else {
      return false;
    }
  },

  innerLeft: function(ball) {
    if((ball.x >= ball.paddle.position.x + 25) && (ball.x <= ball.paddle.position.x + 49)) {
      return true;
    } else {
      return false;
    }
  },

  centerLeft: function(ball) {
    if((ball.x >= ball.paddle.position.x + 50) && (ball.x <= ball.paddle.position.x + 74)) {
      return true;
    } else {
      return false;
    }
  },

  centerRight: function(ball) {
    if((ball.x >= ball.paddle.position.x + 75) && (ball.x <= ball.paddle.position.x + 99)) {
      return true;
    } else {
      return false;
    }
  },

  innerRight: function(ball) {
    if((ball.x >= ball.paddle.position.x + 100) && (ball.x <= ball.paddle.position.x + 124)) {
      return true;
    } else {
      return false;
    }
  },

  outterRight: function(ball) {
    if((ball.x >= ball.paddle.position.x + 125) && (ball.x <= ball.paddle.position.x + 150 + ball.radius)) {
      return true;
    } else {
      return false;
    }
  },

  sideWalls: function(ball) {
    if(ball.x + ball.dx > ball.gameSize.x-ball.radius || ball.x + ball.dx < ball.radius) {
      return true;
    } else {
      return false;
    }
  },

  topWall: function(ball) {
    if((ball.y - ball.canvasHeightOffset) + ball.dy < ball.radius) {
      return true;
    } else {
      return false;
    }
  },

  bottomWall: function(ball) {
    if(ball.y > 520) {
      return true;
    } else {
      return false;
    }
  }
}