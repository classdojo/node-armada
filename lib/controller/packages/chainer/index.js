var chainer = require("brasslet")();

chainer.add("server", {
  clients: {
    type: "clients",
    call: function (next) {
      next(null, this.clients);
    }
  }
})


chainer.add("clients", {
  all: {
    type: "client"
  },
  find: {
    type: "client"
  }
});

chainer.add("client", {
  exec: {
    type: "object"
  }
});

exports.load = function () {
  return chainer;
}