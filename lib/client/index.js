var bindable   = require("bindable"),
packages       = require("packages");


function Client (config) {
  bindable.Object.call(this);

  this._config = new bindable.Object(config);

  packages().
    require({
      config: this._config,
      client: this
    }).
    require(__dirname + "/../common/packages").
    require(__dirname + "/packages").
    load();
}

bindable.Object.extend(Client, {

  /**
   */

  start: function () { },

  /**
   */

  disconnect: function () {
    // todo - emit disconnect
  },

  /**
   */

  ping: function (next) {
    next();
  },

  /**
   */

  exec: function (command, next) {

    next(null, "hello!");
    this.emit.apply(this, arguments);
  },
});

module.exports = Client;