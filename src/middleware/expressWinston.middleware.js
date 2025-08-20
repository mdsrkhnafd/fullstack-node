const expressWinston = require("express-winston");
const logger = require("../helpers/winston.helper.js");

const expressWinstonLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true, // optional: log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}} responded with {{res.statusCode}} in {{res.responseTime}}ms", // optional: customize the default message
  expressFormat: true, // use the default Express/morgan request formatting
  colorize: true, // color the text and status code (default to false)
});


module.exports = expressWinstonLogger;