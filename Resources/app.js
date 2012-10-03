// Generated by CoffeeScript 1.3.3
(function() {
  var ApplicationWindow;

  if (Ti.version < 1.8) {
    alert("Sorry - this application template requires Titanium Mobile SDK 1.8 or later");
  } else if (Ti.Platform.osname === "mobileweb") {
    alert("Mobile web is not yet supported by this template");
  } else {
    ApplicationWindow = require("ui/ApplicationWindow");
    new ApplicationWindow().open();
  }

  Ti.API.log("boot!!");

}).call(this);
