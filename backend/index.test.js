const sinon = require("sinon");
const restify = require("restify-clients");

describe("route post test", function() {
  let routes = require("./routes");

  it("/signupevent post is attached to rest server", function() {
    let stubPost = sinon.stub();
    let localRest = {
      post: stubPost
    };

    routes(localRest, null);
    expect(stubPost.called).toBe(true);
    expect(stubPost.getCall(0).args[0]).toBe("/signupevent");
  });
});

describe("event integration tests", function() {
  let server = null;
  let config = require("./config")("integration_test");

  let client = restify.createJsonClient({
    url: `http://${config.server.ip}:${config.server.port}`
  });

  beforeAll(function(done) {
    server = require("./server");
    let remoteMongo = require("./remoteMongo");
    server
      .start(config, remoteMongo)
      .then(function() {
        done();
      })
      .catch(function(err) {
        expect(err).toBeNull();
        done();
      });
  });

  it("saves correct data", function(done) {
    const data = {
      firstname: "Lucas",
      lastname: "Gadomski",
      email: "lukas@gmail.com",
      eventdate: "2018-01-01"
    };
    client.post("/signupevent", data, function(err, req, res, obj) {
      expect(err).toBeNull();
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  it("empty fields", function(done) {
    const data = {
      firstname: "",
      lastname: "",
      email: "",
      eventdate: ""
    };
    client.post("/signupevent", data, function(err, req, res, obj) {
      expect(err).toBeTruthy();
      expect(res.statusCode).toBe(400);
      done();
    });
  });

  it("bad date", function(done) {
    const data = {
      firstname: "Lucas",
      lastname: "Gadomski",
      email: "lukas@gmail.com",
      eventdate: "abc"
    };
    client.post("/signupevent", data, function(err, req, res, obj) {
      expect(err).toBeTruthy();
      expect(res.statusCode).toBe(400);
      done();
    });
  });

  it("bad email", function(done) {
    const data = {
      firstname: "Lucas",
      lastname: "Gadomski",
      email: "lukasgmail.com",
      eventdate: "abc"
    };
    client.post("/signupevent", data, function(err, req, res, obj) {
      expect(err).toBeTruthy();
      expect(res.statusCode).toBe(400);
      done();
    });
  });

  afterAll(function(done) {
    server.remoteMongo
      .shutdown()
      .then(function() {
        done();
      })
      .catch(function(err) {
        expect(err).toBeNull();
        done();
      });
  });
});
