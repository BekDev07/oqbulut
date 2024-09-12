const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(getAllUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

router.get("/:id", getUserById);

module.exports = router;
