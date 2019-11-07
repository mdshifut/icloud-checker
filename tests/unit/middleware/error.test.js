const error = require("../../../middleware/error");
const logger = require("../../../logger/logger");

// eslint-disable-next-line jest/prefer-spy-on
logger.error = jest.fn();

describe("error middleware", () => {
  it("should log and return error with status code 500", () => {
    expect.hasAssertions();

    const err = new Error("Test Error");
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res)
    };

    error(err, req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.json.mock.calls[0][0]).toHaveProperty("error.message");
    expect(res.json).toHaveBeenCalledTimes(1);

    expect(logger.error).toHaveBeenCalledWith(err);
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});
