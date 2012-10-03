#FirstView Component Constructor
FirstView = ->
  
  #create object instance, a parasitic subclass of Observable
  self = Ti.UI.createView()
  
  #label using localization-ready strings from <app dir>/i18n/en/strings.xml
  label = Ti.UI.createLabel(
    color: "#000000"
    text: String.format(L("welcome"), "Titanium")
    height: "auto"
    width: "auto"
  )
  self.add label
  
  #Add behavior for UI
  label.addEventListener "click", (e) ->
    alert e.source.text

  self
module.exports = FirstView