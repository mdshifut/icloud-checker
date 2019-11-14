const error = require("../middleware/error");
const notFound = require("../middleware/notFound");
const verifyRoute = require("../routes/verifyRoute");

module.exports = app => {
  app.use("/verify", verifyRoute);

  app.use(notFound);
  app.use(error);
};
