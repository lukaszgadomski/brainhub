const restify = require("restify");
const Promise = require("bluebird");
const corsMiddleware = require("restify-cors-middleware");
const cors = corsMiddleware({
  origins: ["*"]
});
const setRoutes = require("./routes");
const localRest = restify.createServer();

module.exports = {
  rest: localRest,
  remoteMongo: null,
  start: function(config, remoteMongo) {
    process.on("SIGTERM", this.shutdown.bind(this));
    process.on("SIGINT", this.shutdown.bind(this));
    this.remoteMongo = remoteMongo;
    return remoteMongo
      .connect(config.mongodb)
      .then(function() {
        return new Promise(function(resolve, reject) {
          localRest.use(cors.actual);
          localRest.use(restify.plugins.bodyParser());
          setRoutes(localRest, remoteMongo);
          localRest.listen(config.server.port, config.server.ip, function(err) {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        });
      })
      .then(function() {
        console.log(`Server listening at ${config.server.ip}`);
      })
      .catch(function(err) {
        console.error(`Errors: ${err}`);
      });
  },
  shutdown: function() {
    console.log("Shutting down...");

    return this.remoteMongo
      .shutdown()
      .then(function() {
        console.log("Shutdown complete");
        process.exit();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
