const express = require("express");
const { signUpUser, signInUser } = require("../controllers/auth-controller");

const router = express.Router();

router.post("/signUpUser", signUpUser);
router.post("/signInUser", signInUser);

module.exports = router;
