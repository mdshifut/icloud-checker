module.exports = (req, res) =>
  res.status(404).json({
    error: {
      message:
        "The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again."
    }
  });
