var _ = require("underscore"),
traverse = require("traverse"),
bindable = require("bindable");


function copyValue (obj) {
  var clone;

  if (typeof obj === "object") {

    clone = {};

    for (var property in obj) {

      // skip private properties
      if (property.substr(0, 1) === "_") continue;

      var value = obj[property];
      
      if (typeof value === "function") {
        value = _.bind(value, obj);
      } 

      clone[property] = value;
    }

  } else {
    clone = obj;
  }

  return clone;
}

exports.load = function () {
  return {
    wrapDNodeObject: function (obj) {


      var clone = new bindable.Object();

      traverse(obj).forEach(function (x) {

        if (~this.path.join(".").indexOf("_")) return;

        console.log(x);

        clone.set(this.path, copyValue(x));
      });


      return clone.context();
    }
  }
}