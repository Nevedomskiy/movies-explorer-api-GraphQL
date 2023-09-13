const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const User = require('../models/user');
const Movie = require('../models/movie');

// const {
//   validationPatchUser,
// } = require('../utils/validation/validation');

// const {
//   getUserInfo,
//   changeUserInfo,
// } = require('../controllers/users');

// routerUser.get('/me', getUserInfo);

// routerUser.patch(
//   '/me',
//   validationPatchUser,
//   changeUserInfo,
// );

// User Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const movieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    country: { type: GraphQLString },
    director: { type: GraphQLString },
    duration: { type: GraphQLString },
    year: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    trailerLink: { type: GraphQLString },
    nameRU: { type: GraphQLString },
    nameEN: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    movieId: { type: GraphQLID },
    owner: { type: GraphQLID },
    ownerInfo: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.owner);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLID } },
      resolve() {
        return User.find();
      },
    },
    movie: {
      type: movieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(movieType),
      args: { id: { type: GraphQLID } },
      resolve() {
        return Movie.find();
      },
    },
  }),
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {

    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
