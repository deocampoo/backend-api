const express = require("express");
const router = express.Router();
const {
  addMovie,
  listAllMovies,
  getMovieById,
  removeMovie,
} = require("../controllers/movie-controller");

router.post("/", addMovie);
router.get("/", listAllMovies);
router.get("/:id", getMovieById);
router.delete("/:id", removeMovie);

module.exports = router;
