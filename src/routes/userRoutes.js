const express = require("express");

const {getProfile, deleteUser, listUsers} = require("../controllers/userController");
const router = express.Router();

router.get("/:id", getProfile);
router.delete("/:id", deleteUser);
router.get("/", listUsers);


module.exports = router;
