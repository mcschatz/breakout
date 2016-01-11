var positions = { outterLeft: [-10, 24],
                  innerLeft: [25, 49],
                  centerLeft: [50, 74],
                  centerRight: [75, 99],
                  innerRight: [100, 124],
                  outterRight: [125, 160]
                }

module.exports = {

  change: function(ball, location) {
    return !!((ball.x >= ball.paddle.position.x + positions[location][0]) && (ball.x <= ball.paddle.position.x + positions[location][1]))
  },

  sideWalls: function(ball) {
    return !!(ball.x + ball.dx > ball.gameSize.x - ball.radius || ball.x + ball.dx < ball.radius)
  },

  topWall: function(ball) {
    return !!((ball.y - ball.canvasHeightOffset) + ball.dy < ball.radius)
  },

  bottomWall: function(ball) {
    return !!(ball.y > 520)
  }
};