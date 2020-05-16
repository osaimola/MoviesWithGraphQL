const graphql = require("graphql");
const _ = require("lodash");
const movieModel = require("../models/movies");
const directorModel = require("../models/directors");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

/** 
 *  data dumps
let movies = [
  { name: "Lord of the Rings", genre: "Fantasy", id: "1", directorId: "1" },
  { name: "The Departed", genre: "Thriller", id: "2", directorId: "2" },
  {
    name: "Blue is the Warmest Color",
    genre: "Drama",
    id: "3",
    directorId: "3",
  },
];
let directors = [
  { name: "J R Tolkien", age: 45, id: "1" },
  { name: "Franz Patty", age: 38, id: "2" },
  { name: "Anne DeBolt", age: 36, id: "3" },
];
*/

// we define the movie type
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    // we nest a query to search for this movie's director
    // the parent item will contain all info from THiS movie which includes director ID
    director: {
      type: DirectorType,
      resolve(parent, args) {
        //return _.find(directors, { id: parent.directorId });
        return directorModel.findById(parent.directorId);
      },
    },
  }),
});

// defining the director type
const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        return movieModel.find({ directorId: parent.id });
      },
    },
  }),
});

// we define the root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // this entry 'movie' is the name which will be used in requests
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } }, // define the arguements to filter requests by
      // the resolve function will handle how the request is processed
      resolve(parent, args) {
        // get date from db or sources here
        return movieModel.findById(args.id);
      },
    },

    // entry for the directors
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directorModel.findById(args.id);
      },
    },

    // entry for all movies
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        return movieModel.find({});
      },
    },

    // entry for all directors
    directors: {
      type: GraphQLList(DirectorType),
      resolve(parent, args) {
        return directorModel.find({});
      },
    },
  },
});

// we define mutations to handle passing data to our DB
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // creating a new director with graphqlin db
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, // use graphqlnonnull to set an arg as required
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        // create a new mongo object using the args and the director model
        let director = new directorModel({
          name: args.name,
          age: args.age,
        });
        // save the created entry and return response form mongo db
        return director.save();
      },
    },

    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let movie = new movieModel({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });

        return movie.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
