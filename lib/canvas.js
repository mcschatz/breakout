var Canvas = function(){
  if (document.getElementById('canvas')){
    return document.getElementById('canvas').getContext('2d');
  } else {
    var context = document.createElement('canvas');
    context.width = 782;
    context.height = 520;
    return context.getContext('2d');
  }
};

module.exports = Canvas;