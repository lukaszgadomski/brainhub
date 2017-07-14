const config = require("./config")(process.env.NODE_ENV);
const server = require("./server");

const remoteMongo = require("./remoteMongo");

server.start(config, remoteMongo);
