const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title_movie: {
      type: String,
      required: function () {
        return this.media_type === "movie";
      },
    },
    title_tv: {
      type: String,
      required: function () {
        return this.media_type === "tv";
      },
    },
    media_type: {
      type: String,
      required: true,
      enum: ["movie", "tv"],
    },
    genre: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: function () {
        return this.media_type === "movie";
      },
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
