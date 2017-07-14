const mongoClient = require("mongodb").MongoClient;
const Promise = require("bluebird");

module.exports = {
  handler: null,
  connect: function(config) {
    const mongoConnectUrl = `mongodb://${config.ip}:${config.port}/${config.name}`;
    return new Promise(function(resolve, reject) {
      mongoClient.connect(mongoConnectUrl, function(err, db) {
        if (err) {
          reject(err);
          return;
        }
        resolve(db);
      });
    }).then(
      function(db) {
        this.handler = db;
      }.bind(this)
    );
  },
  db: function() {
    return this.handler;
  },
  shutdown: function() {
    return new Promise(
      function(resolve, reject) {
        if (!this.db()) {
          resolve();
          return;
        }
        this.db().close(function(err) {
          if (err) {
            reject(err);
            return;
          }
          console.log("Mongodb connection closed");
          resolve();
        });
      }.bind(this)
    );
  }
};
