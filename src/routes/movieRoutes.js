const express = require("express");
const router = express.Router();
const { insertMovie, deleteMovie, fetchMovieById, listAllMovies } = require("../controllers/movieController");

router.post("/", insertMovie);
router.delete("/:id", deleteMovie);
router.get("/:id", fetchMovieById);
router.get("/", listAllMovies);

module.exports = router;
