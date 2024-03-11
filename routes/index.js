const router = require('express').Router(); // Importing Router from express
const apiRoutes = require('./api'); // Importing API routes

router.use('/api', apiRoutes); // Using the API routes under the '/api' endpoint

// Handling invalid routes with a default message
router.use((req, res) => res.send('Wrong route!'));

module.exports = router; // Exporting the router for use in other modules
