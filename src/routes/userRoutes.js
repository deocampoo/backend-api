const express = require("express");

const {getProfile, deleteUser, updateUserPassword, listUsers} = require("../controllers/userController");
const router = express.Router();

router.get("/:id", getProfile);
router.delete("/:id", deleteUser);
router.put("/recovery", updateUserPassword);
router.get("/", listUsers);


module.exports = router;
