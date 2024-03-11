const express = require('express'); // Importing express module
const db = require('./config/connection'); // Importing database connection
const routes = require('./routes'); // Importing routes

const cwd = process.cwd(); // Getting current working directory

const PORT = process.env.PORT || 3001; // Setting up port, defaulting to 3001
const app = express(); // Creating express application

// Middleware for parsing incoming requests with urlencoded and json payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using routes defined in the routes module
app.use(routes);

// Once the database connection is open, start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Now running on port ${PORT}!`); // Logging server running message
  });
});
