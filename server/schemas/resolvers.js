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
    venues: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Venue.find(params).sort({ createdAt: -1 });
    },
    venue: async (parent, { venueId }) => {
      return Venue.findOne({ _id: venueId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('venues');
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
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    

    addComment: async (parent, { venueId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          commentAuthor: context.user.username,
        });
  
        await Venue.findOneAndUpdate(
          { _id: venueId },
          {
            $addToSet: {
              comments: comment._id,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
  
        return comment;
      }
  
      throw new AuthenticationError('You need to be logged in!');
    },

    removeVenue: async (parent, { venueId }, context) => {
      if (context.user) {
        const venue = await Venue.findOneAndDelete({
          _id: venueId,
          venueAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { venues: venue._id } }
        );

        return venue;
      }
      throw AuthenticationError;
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