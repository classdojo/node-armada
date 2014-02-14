var protoclass = require("protoclass"),
_              = require("underscore"),
bindable       = require("bindable"),
async          = require("async"),
hurryup        = require("hurryup"),
sift           = require("sift");

function Clients (server, logger) {
  bindable.Object.call(this);
  this._server  = server;
  this._logger = logger;
  this._source = [];
  this._pingClients();
  this._id = 0;
}

protoclass(Clients, {

  /**
   */

  add: function (client) {
    if (!client) return;
    this._source.push(client);

    client.id   = String(this._id++);
    client.info = client.info || {}; // queryable

    this._logger.notice("added client");
  },

  /**
   */

  all: function (next) {
    this.find(next);
  },

  /**
   */

  find: function (query, next) {

    if (arguments.length < 2) {
      next  = query || function(){};
      query = function () { return true; }
    }

    var tester = sift(query),
    result = this._source.filter(function (client) {
      return tester.test(client.info);
    });

    next(null, result);
  },

  /**
   */

  _pingClients: function () {
    var self = this;
    async.each(this._source, function (client, next) {

      var fn = hurryup(_.bind(client.ping, client), { timeout: 1000 * 5 })

      fn(function (err) {
        if (err) {
          console.log(err)
          console.log("taking client %s out of pool", client.id);
          client.disconnect();
          self._source.splice(self._source.indexOf(client), 1);
        }
        next();
      })
 
    }, function () {
      setTimeout(function () {
        self._pingClients();
      }, 1000 * 2);
    });
  }
});

module.exports = Clients;