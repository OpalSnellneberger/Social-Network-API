const express = require('express');
const db = require('./config/connection'); // Importing database connection
const routes = require('./routes'); // Importing routes
const helmet = require('helmet'); // Importing Helmet for HTTP headers security
const compression = require('compression'); // Importing Compression for response compression

const PORT = process.env.PORT || 3001; // Setting the port for the server
const app = express(); // Creating an Express application instance

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies
app.use(express.json()); // Parsing JSON bodies
app.use(helmet()); // Applying Helmet middleware for HTTP security headers
app.use(compression()); // Applying Compression middleware for response compression

// Mounting routes
app.use(routes); // Mounting routes defined in the 'routes' module

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logging the error stack
  res.status(500).send('Internal Server Error'); // Sending a 500 Internal Server Error response
});

// Event listener for when the database connection is opened
db.once('open', () => {
  // Starting the Express server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Logging that the server is running and on which port
  });
});
