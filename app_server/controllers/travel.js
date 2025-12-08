// Base URL and options for fetching trip data from our API
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

const travelList = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);
    const trips = await response.json();

    // Handle cases where no trips are returned
    if (!Array.isArray(trips) || trips.length === 0) {
      return res.render('travel', {
        title: 'Travlr Getaways – Travel',
        active_travel: true,
        trips: [],
        message: 'No trips found in the database.'
      });
    }

    // Normal case – render trips from the API
    return res.render('travel', {
      title: 'Travlr Getaways – Travel',
      active_travel: true,
      trips: trips
    });
  } catch (err) {
    console.error('Error fetching trips from API:', err);
    return res.status(500).send('Error fetching trips from API');
  }
};

module.exports = {
  travelList
};