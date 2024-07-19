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
    genre: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
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
