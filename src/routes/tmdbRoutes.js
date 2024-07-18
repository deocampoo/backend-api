const express = require("express");
const { insertMovieFromTMDB } = require("../controllers/movieController");
const router = express.Router();

router.post("/from-tmdb/:movieId", insertMovieFromTMDB);

module.exports = router;
