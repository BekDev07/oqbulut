const jwt = require("jsonwebtoken");
// Function to generate JWT token

const generateAccessToken = (user) => {
  // console.log(user.roles);
  return jwt.sign(
    {
      username: user.username,
      roles: user.roles,
      userId: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" }
  );
};

const generateRefreshToken = (user) => {
  console.log(user);
  return jwt.sign(
    {
      username: user.username,
      roles: user.roles,
      userId: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" } // Expires in 1 days
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
