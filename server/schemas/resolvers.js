const { Venue, Comment, Profile } = require('../models');

const resolvers = {
  Query: {
    venues: async () => {
      return Tech.find({});
    },
    venue: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Venue.find(params);
    },
  },
  Mutation: {
    createProfile: async (parent, args) => {
      
    },
    createComment: async (parent, { venueId, commentText }) => {
        return Venue.findOneAndUpdate(
           
        );
    },
    updateComment: async (parent, args) => {

    },
    removeComment: async (parent, { venueId, commentId }) => {
        return Venue.findOneAndUpdate(
          
        );
    },
    createVenue: async (parent, args) => {
        
    },
    updateVenue: async (parent, args) => {

    },
  },
};

module.exports = resolvers;