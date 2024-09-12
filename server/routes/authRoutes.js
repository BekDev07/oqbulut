const express = require("express");
const router = express.Router();

const {
  login,
  refresh,
  register,
  logout,
} = require("../controllers/authController");

const loginLimiter = require("../middlewares/loginLimiter");

router.route("/login", loginLimiter).post(login);
router.route("/register", loginLimiter).post(register);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

module.exports = router;
