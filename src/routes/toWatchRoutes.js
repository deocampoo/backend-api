const express = require("express");
const router = express.Router();
const toWatchController = require("../controllers/toWatchController");

router.post("/:userId/toWatch", toWatchController.insertMovie);
router.delete("/:userId/toWatch/:movieId", toWatchController.deleteMovie);
router.get("/:userId/toWatch", toWatchController.listAllMovies);

module.exports = router;
