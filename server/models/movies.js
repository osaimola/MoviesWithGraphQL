// describe the mongo db movie model
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const movieSchema = new schema({
  name: String,
  genre: String,
  directorId: String,
});

module.exports = mongoose.model("Movie", movieSchema);
