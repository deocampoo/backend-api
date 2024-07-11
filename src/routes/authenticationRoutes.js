const express = require("express");
const { createUser, loginUser, logoutUser } = require("../controllers/authenticationController");

const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/logoutUser", logoutUser);

module.exports = router;
