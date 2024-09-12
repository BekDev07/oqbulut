const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const register = async (req, res) => {
  const { username, password, phoneNumber, roles, ...rest } = req.body;
  // console.log(username, password, phoneNumber);
  try {
    // Check if the user already exists
    let existingUser = await User.findOne({ $or: [{ username, phoneNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      password,
      phoneNumber,
      roles,
      ...rest,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await newUser.save();

    // Generate access token
    const accessToken = generateAccessToken(newUser);

    // Generate refresh token
    const refreshToken = generateRefreshToken(newUser);

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: process.env.NODE_ENV === "production", // set secure to true in production
    });

    // Send both tokens as JSON response
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user || !user.active) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(user);
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate access token
    const accessToken = generateAccessToken(user);

    // Generate refresh token
    const refreshToken = generateRefreshToken(user);

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // set secure to true in production
      // secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 days
    });

    // Send access token as JSON response
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken)
    return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.refreshToken;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = generateAccessToken(foundUser);

      res.json({ accessToken });
    }
  );
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies || !cookies?.refreshToken) return res.sendStatus(204); //No content
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
};

module.exports = { register, login, refresh, logout };
