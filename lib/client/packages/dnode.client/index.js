var dnode = require("dnode"),
_         = require("underscore");

exports.require = ["config", "logger", "client", "dsync"];
exports.load = function (config, logger, client, dsync) {

  function connect () {


    logger.notice("connecting to %s:%d", config.get("server.hostname"), config.get("server.port"));

    var d = dnode.connect({ 
      hostname: config.get("server.hostname"), 
      port: config.get("server.port") 
    });

    d.on("remote", function (remote) {
      remote.authorize({ secret: config.get("server.secret") }, function (err, server) {

        if (err) {
          console.error(err);
          process.exit(1);
        }

        logger.notice("connected to server, registering self");

        server.clients.add(dsync(client));
        client.set("server", server);
      });
    });

    d.on("end", reconnect).on("error", reconnect);
  }

  function reconnect () {
    setTimeout(connect, 1000);
  }

  connect();
}