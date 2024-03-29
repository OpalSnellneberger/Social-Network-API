const mongoose = require('mongoose');

// Define the connection string to MongoDB
const connectionString = 'mongodb://localhost:27017/mydatabase'; // Example connection string

// Options for mongoose connection
const options = {
  useNewUrlParser: true, // Parse connection string using new URL parser
  useUnifiedTopology: true // Use new Server Discovery and Monitoring engine
};

// Connect to MongoDB using mongoose
mongoose.connect(connectionString, options)
  .then(() => console.log(`Mongoose connected to ${connectionString}`))
  .catch(err => console.error(`Mongoose connection error: ${err}`));

// Event listener for when MongoDB connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Event listener for SIGINT signal (Ctrl+C) to gracefully close the connection
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0); // Exit with success
  } catch (error) {
    console.error('Error closing Mongoose connection:', error);
    process.exit(1); // Exit with failure
  }
});

// Export the mongoose connection object
module.exports = mongoose.connection;
