#Application Window Component Constructor
ApplicationWindow = ->
  
  #load component dependencies
  FirstView = require("ui/FirstView")
  
  #create component instance
  self = Ti.UI.createWindow(
    backgroundColor: "#ffffff"
    navBarHidden: true
    exitOnClose: true
  )
  
  #construct UI
  firstView = new FirstView()
  self.add firstView
  self

#make constructor function the public component interface
module.exports = ApplicationWindow