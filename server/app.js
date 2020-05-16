const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const { url, options } = require("./mongooseSettings");

const app = express();

// allow cross origin requests
app.use(cors());

// create a database connection to mongodb
mongoose.co;
mongoose.connect(url, options);
// add an event listener for when a connection is established
mongoose.connection.once("open", () => {
  console.log("connection established");
});

// add middleware on the graphql endpoint to
// pass requests through express-graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, // turn on the graphiql tool at thiis endpoint
  })
);

app.listen(4000, () => {
  console.log("now listening on port 4000");
});
