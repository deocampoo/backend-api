const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: function () {
        return this.media_type === "movie";
      },
    },
    name: {
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
    trailerUrl: {
      type: String,
    },
    overview: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
