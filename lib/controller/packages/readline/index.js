var readline = require("readline"),
vm           = require("vm"),
type         = require("type-component"),
flatten      = require("flatten");

exports.require = ["controller", "chainer"];
exports.load = function (client, chainer) {

  var rl, chain, server, context = {};

  function initialize () {

    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    getInput();
  }

  function getInput () {
    rl.question("> ", function (command) { 
      execCommand(command);
      chain.then(getInput);
    });
  }

  function execCommand (command) {
    var cchain;

    try {
      // convert something like instances.find() to instances().find()
      // or regions.all.instances.find() to regions().all().instances().find()
      command = command.replace(/(\w)\.(\w)/g, "$1().$2");

      cchain = vm.createScript(command).runInNewContext(context);
    } catch (e) {
      console.error(e);
    }

    if (!cchain || !cchain.then) return;

    cchain.then(function (err, results) {
      if (err) console.error(err);

      if (results.length === 1) {
        results = results[0];
      }

      var t;

      console.log(results);

      next2();
    });

  }


  function onServer (s) {
    server = s;
    chain = chainer.wrap("server", s);


    context = {
      clients: chain.clients
    }
  }


  client.bind("server", { max: 1, to: initialize }).now();
  client.bind("server", { to: onServer }).now();
}