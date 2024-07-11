const express = require("express");

const { insertMovie, deleteMovie, listAllMovies} = require("../controllers/favoriteController");
const router = express.Router();

router.put("/:userId/:movieId", insertMovie);
router.delete("/:userId/:movieId", deleteMovie);
router.get("/:userId", listAllMovies);


module.exports = router;
