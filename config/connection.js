// Importing necessary modules from the mongoose package
const { connect, connection } = require('mongoose');

// MongoDB connection string
const connectionString = 'mongodb://localhost/my_database';

// Establishing connection to MongoDB database using mongoose
connect(connectionString, { 
  useNewUrlParser: true, // Option to use the new parser for URL parsing
  useUnifiedTopology: true // Option to use the new Server Discovery and Monitoring engine
});

// Event listener for successful connection
connection.on('connected', () => {
  console.log(`Mongoose connected to ${connectionString}`); // Logging successful connection message
});

// Event listener for connection error
connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`); // Logging connection error message
});

// Event listener for disconnection
connection.on('disconnected', () => {
  console.log('Mongoose disconnected'); // Logging disconnection message
});

// Event listener for SIGINT signal (Ctrl+C) to gracefully close the connection
process.on('SIGINT', () => {
  connection.close(() => {
    console.log('Mongoose connection closed through app termination'); // Logging closure message
    process.exit(0); // Exiting the Node.js process with status code 0
  });
});

// Exporting the connection object for external usage if needed
module.exports = connection;
