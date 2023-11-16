const { Schema, model } = require('mongoose');

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
    type: Number,
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
 comments: {type: Array}
  [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
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
