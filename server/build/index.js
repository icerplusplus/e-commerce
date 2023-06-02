"use strict";

var _config = require("./config");
var _routes = require("./routes");
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

// main configs
(0, _config.configHandler)(app);

// routes initial
(0, _routes.initialRoute)(app);

// server running
app.listen(process.env.SERVER_PORT, function () {
  console.log("\uD83D\uDE80 Server running at: http://".concat(process.env.SERVER_HOST, ":").concat(process.env.SERVER_PORT));
});