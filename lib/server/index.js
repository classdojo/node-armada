var bindable   = require("bindable"),
packages       = require("packages");


function Server (config) {

  bindable.Object.call(this);

  this._config = new bindable.Object(config);

  packages().
  require({
    config: this._config,
    server: this
  }).
  require(__dirname + "/../common/packages").
  require(__dirname + "/packages").
  load();
}

bindable.Object.extend(Server, {

  /**
   */

  start: function () {

  }
});

module.exports = Server;