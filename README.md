## Runing the GraphQL Server

-Download/Clone the repo.
-create a "mongooseSettings.js" file with the following format:

const url =
<your mongo db url>;

const options = {
user: <mongodb user>,
pass: <mongodb password>,
useNewUrlParser: true,
useUnifiedTopology: true,
};

module.exports = {
url: url,
options: options,
};

-open terminal and cd to the server folder
-run "node app"

You will now find a working graphQL server at "http://localhost:4000/graphql"
