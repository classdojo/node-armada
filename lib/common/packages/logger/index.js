var _ = require("underscore");

exports.load = function () {
  return {
    verbose : _.bind(console.log, console),
    notice  : _.bind(console.log, console),
    error   : _.bind(console.error, console),
    warn    : _.bind(console.warn, console)
  };
}