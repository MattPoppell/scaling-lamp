const { Venue, Comment, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    venues: async () => {
      return Venue.find();
    },
    venue: async (parent, { venueId }) => {
      return Venue.findOne({ _id: venueId });
    },
    venueName: async (parent, { venueName }) => {
      return Venue.findOne({ name: venueName });
    },
    venueCity: async (parent, { venueCity }) => {
      return Venue.find({ city: venueCity });
    },
    venueState: async (parent, { venueState }) => {
      return Venue.find({ state: venueState });
    },
    venueGenre: async (parent, { venuePreferredGenres }) => {
      return Venue.find({ preferredGenre: venuePreferredGenres });
    },
    venueFood: async (parent, { venueFood }) => {
      return Venue.find({ catering: venueFood });
    },
    
    
    

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addVenue: async (parent, { name, city, state, capacity, preferredGenre, catering, barsNearby }, context) => {

      if (context.user) {
        const venue = await Venue.create({
          name,
          city,
          state,
          capacity,
          preferredGenre,
          catering,
          barsNearby
        });
    
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { venues: venue._id } }
        );
    
        return venue;
      } else {
        throw new AuthenticationError('You need to be logged in!');
      }
    },    

    addComment: async (parent, { venueId, commentText }, context) => {
      if (context.user) {
        return Venue.findOneAndUpdate(
          { _id: venueId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    removeVenue: async (parent, { venueId }, context) => {
      if (context.user !== null) {

        const venue = await Venue.findOneAndDelete({
          _id: venueId
        });

        if (venue !== null) {
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { venues: venue._id } }
          );
    
          return venue;
        } else {
          throw new Error("Venue not found or already deleted.");
        }
      } else {
        throw new AuthenticationError("User not authenticated.");
      }
    },
    
    
    removeComment: async (parent, { venueId, commentId }, context) => {
      if (context.user) {
        return Venue.findOneAndUpdate(
          { _id: venueId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};


module.exports = resolvers;