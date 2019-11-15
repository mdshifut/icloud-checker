const logger = require("../logger/logger");

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  console.log("Node env", process.env.NODE_ENV);
  logger.error(err);
  return res.status(500).json({ error: { message: "Internal server error" } });
};
