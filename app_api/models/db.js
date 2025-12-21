const mongoose = require('mongoose');
const readline = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Prevent deprecation warnings in newer Mongoose versions
mongoose.set('strictQuery', false);

// Establish connection to MongoDB with a short startup delay
const connect = () => {
  setTimeout(() => {
    mongoose.connect(dbURI);
  }, 1000);
};

// Connection events
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown helper
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// Handle nodemon restarts across platforms
if (process.platform === 'win32' || process.platform === 'darwin' || process.platform === 'linux') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// App termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// Platform termination (Heroku compatibility)
process.on('SIGTERM', () => {
  gracefulShutdown('platform shutdown', () => {
    process.exit(0);
  });
});

// Start MongoDB connection
connect();

// Register models
require('./travlr'); // Trip data model
require('./user');   // User authentication model

// Export mongoose instance
module.exports = mongoose;