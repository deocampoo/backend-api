const express = require("express");

const {
  getUserProfile,
  listAllUsers,
  removeUser,
  updatePassword,
} = require("../controllers/user-controller");
const router = express.Router();

router.get("/", listAllUsers);
router.get("/:id", getUserProfile);
router.delete("/:id", removeUser);
router.put("/recovery", updatePassword);

module.exports = router;
