module.exports = {

  displayStyles: function(location, style){
    document.getElementById(location).style.display = style;
  },

  getId: function(id){
    return document.getElementById(id)
  },

   showText: function (target, message, index, interval) {
    if (index < message.length) {
      $(target).append(message[index++]);
      var self = this
      setTimeout(function () {
        self.showText(target, message, index, interval);
      }, interval);
    }
  }
}
