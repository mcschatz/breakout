var Colors = function() {
  var colorWheel = []
  for (var i = 0; i < 48; i++) {
    if (i < 48){
      colorWheel.push("#CC3ED0")
      colorWheel.push("#F95255")
      colorWheel.push("#FE801A")
      colorWheel.push("#FF911B")
      colorWheel.push("#10AC24")
      colorWheel.push("#6667FF")
      }
  };
  return colorWheel
};

module.exports = Colors;