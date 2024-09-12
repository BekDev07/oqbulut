const { rateLimit } = require("express-rate-limit");
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  limit: 100,
  message: {
    message:
      "Too many login attemps from this IP, please try again after 60 second pause",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

module.exports = loginLimiter;
