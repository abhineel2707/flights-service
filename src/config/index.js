module.exports = {
  ServerConfig: require('./server-config'),
  Logger: require('./logger-config').combinedLogger,
  ErrorLogger: require('./logger-config').errorLogger
};
