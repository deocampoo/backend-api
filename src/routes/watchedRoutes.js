const express = require("express");
const router = express.Router();
const watchedController = require("../controllers/watchedController");

router.post("/:userId/watched", watchedController.insertMovie);
router.delete("/:userId/watched/:movieId", watchedController.deleteMovie);
router.get("/:userId/watched", watchedController.listAllMovies);

module.exports = router;
