const error = require("../middleware/error");
const notFound = require("../middleware/notFound");
const checkRoute = require("../routes/checkRoute");

module.exports = app => {
  app.use("/verify", checkRoute);

  app.use(notFound);
  app.use(error);
};
