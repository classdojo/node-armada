var Clients = require("./clients");

exports.require = ["server", "logger"];
exports.load = function (server, logger) {
  return server.clients = new Clients(server, logger);
}