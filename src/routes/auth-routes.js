const express = require("express");
const { signUpUser, signInUser, logoutUser } = require("../controllers/auth-controller");

const router = express.Router();

router.post("/signUpUser", signUpUser);
router.post("/signInUser", signInUser);
router.post('/logout', logoutUser); 


module.exports = router;
