// describe the mongo db director model

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const directorSchema = new schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Director", directorSchema);
