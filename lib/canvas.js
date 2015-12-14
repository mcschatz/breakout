var Canvas = function(){
  if (document.getElementById('canvas')){
      var canvas = document.getElementById('canvas').getContext('2d');
      return canvas
  } else {
      var context = document.createElement('canvas');
      context.width = 782;
      context.height = 520;
      var canvas = context.getContext('2d');
      return canvas
  }
}

module.exports = Canvas;