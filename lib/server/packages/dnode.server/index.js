var dnode = require("dnode"),
comerr    = require("comerr");

exports.require = ["config", "logger", "server", "utils", "dsync"];
exports.load = function (config, logger, server, utils, dsync) {

  var s = dnode({

    /**
     */

    authorize: function (options, next) {

      if (options.secret !== config.get("server.secret")) {
        return next(comerr.unauthorized());
      }

      // return the clients
      next(null, dsync(server));
    }
  });


  s.listen(config.get("server.port"));

  logger.notice("listening on port %d", config.get("server.port"));
}