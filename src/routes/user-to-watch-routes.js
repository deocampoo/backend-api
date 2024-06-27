const express = require("express");

const {
  listAll,
  addMovie,
  removeMovie,
} = require("../controllers/user-to-watch-controller");
const router = express.Router();

router.get("/:userId", listAll);
router.put("/:userId/:movieId", addMovie);
router.delete("/:userId/:movieId", removeMovie);

module.exports = router;
