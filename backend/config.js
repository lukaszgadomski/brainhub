module.exports = function(env) {
  switch (env) {
    case "integration_test":
      return {
        server: {
          ip: "127.0.0.1",
          port: 9002
        },
        mongodb: {
          ip: "127.0.0.1",
          port: 27017,
          name: "test"
        }
      };

    default:
      return {
        server: {
          ip: "127.0.0.1",
          port: 9001
        },
        mongodb: {
          ip: "127.0.0.1",
          port: 27017,
          name: "brain"
        }
      };
  }
};
