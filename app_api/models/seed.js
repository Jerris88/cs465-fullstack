const mongoose = require('./db'); // use the existing db connection logic
const Trip = mongoose.model('trips'); // Trip model registered in travlr.js
const tripsData = require('../../data/trips.json'); // seed data

const seedTrips = async () => {
  try {
    console.log('Clearing existing trips collection...');
    await Trip.deleteMany({});

    console.log('Inserting trips from trips.json...');
    const createdTrips = await Trip.insertMany(tripsData);

    console.log(`Seed complete. Inserted ${createdTrips.length} trips.`);
  } catch (err) {
    console.error('Error seeding trips:', err);
  } finally {
    try {
      await mongoose.connection.close();
      console.log('Mongoose connection closed after seeding.');
    } catch (closeErr) {
      console.error('Error closing Mongoose connection:', closeErr);
    } finally {
      process.exit(0);
    }
  }
};

seedTrips();