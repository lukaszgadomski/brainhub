const yup = require("yup");
const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email(),
  eventdate: yup.date().required()
});

module.exports = function(localRest, remoteMongo) {
  localRest.post("/signupevent", function(req, res, next) {
    let data = {};
    try {
      data = (typeof req.body == "string" && JSON.parse(req.body)) || req.body;
    } catch (err) {
      res.send(400, "Bad data try again");
      return next();
    }
    let collection = remoteMongo.db().collection("signup_to_events");
    schema
      .validate(data)
      .then(function() {
        return collection.insert(data).then(function() {
          res.send(200);
          next();
        });
      })
      .catch(function(err) {
        res.send(400, err);
        next();
      });
  });
};
