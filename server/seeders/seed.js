const db = require('../config/connection');
const { User, Venue } = require('../models');
const userSeeds = require('./userSeeds.json');
const venueSeeds = require('./venueSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Venue', 'venues');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    await Venue.create(venueSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Party on, Wayne! Database seeded!');
  process.exit(0);
});
