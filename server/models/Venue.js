const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const venueSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  city: {
    type: String,
    required: false,
    trim: true,
  },
  state: {
    type: String,
    required: false,
    trim: true,
  },
  capacity: {
    type: String,
    required: false,
    trim: true,
  },
  preferredGenre: {
    type: Array,
    required: false,
    trim: true,
  },
  catering: {
    type: Boolean,
    required: false,
  },
  barsNearby: {
    type: Boolean,
    required: false,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: 'You need to leave something!',
        trim: true,
      },
      commentAuthor: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});



const Venue = model('Venue', venueSchema);

module.exports = Venue;
