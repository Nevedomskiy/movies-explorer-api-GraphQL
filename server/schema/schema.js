const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
// const GraphQLEmail = require('graphql-type-email');

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

// Type User
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Type Movie
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    country: { type: GraphQLString },
    director: { type: GraphQLString },
    duration: { type: GraphQLInt },
    year: { type: GraphQLInt },
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

    // returns user by id
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },

    // returns all users
    users: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLID } },
      resolve() {
        return User.find();
      },
    },

    // returns user by id
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },

    // returns all movies
    movies: {
      type: new GraphQLList(MovieType),
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

    // create new User in db
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },

    // Delete User from db
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return User.findByIdAndDelete(args.id);
      },
    },

    // update new User in db
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
            },
          },
          { new: true },
        );
      },
    },

    // create new Movie in db
    addMovie: {
      type: MovieType,
      args: {
        country: { type: new GraphQLNonNull(GraphQLString) },
        director: { type: new GraphQLNonNull(GraphQLString) },
        duration: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        trailerLink: { type: new GraphQLNonNull(GraphQLString) },
        nameRU: { type: new GraphQLNonNull(GraphQLString) },
        nameEN: { type: new GraphQLNonNull(GraphQLString) },
        thumbnail: { type: new GraphQLNonNull(GraphQLString) },
        movieId: { type: new GraphQLNonNull(GraphQLID) },
        owner: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const movie = new Movie({
          country: args.country,
          director: args.director,
          duration: args.duration,
          year: args.year,
          description: args.description,
          image: args.image,
          trailerLink: args.trailerLink,
          nameRU: args.nameRU,
          nameEN: args.nameEN,
          thumbnail: args.thumbnail,
          movieId: args.movieId,
          owner: args.owner,
        });
        return movie.save();
      },
    },

    // Delete Movie from db
    deleteMovie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Movie.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
