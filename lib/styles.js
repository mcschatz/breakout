module.exports = {

  displayStyles: function(location, style){
    document.getElementById(location).style.display = style;
  },

  getId: function(id){
    return document.getElementById(id)
  }
}
