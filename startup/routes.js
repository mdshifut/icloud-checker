const error = require("../middleware/error");
const notFound = require("../middleware/notFound");

module.exports = app => {
  app.use(notFound);

  app.use(error);
};
