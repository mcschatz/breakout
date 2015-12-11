var Colors = function() {
  var colorWheel = []
  for (var i = 0; i < 50; i++) {
    if (i < 50){
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