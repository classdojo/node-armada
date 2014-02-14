var bindable   = require("bindable"),
packages       = require("packages");


function Controller (config) {
  bindable.Object.call(this);

  this._config = new bindable.Object(config);

  packages().
    require({
      config: this._config,
      controller: this
    }).
    require(__dirname + "/../common/packages").
    require(__dirname + "/packages").
    load();
}

bindable.Object.extend(Controller, {

  /**
   */

  start: function () {

  }
});

module.exports = Controller;