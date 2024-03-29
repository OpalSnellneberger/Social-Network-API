const router = require('express').Router(); // Importing Express Router
const thoughtRoutes = require('./thoughtRoutes'); // Importing routes for thoughts
const userRoutes = require('./userRoutes'); // Importing routes for users

// Mounting thought routes under the '/thoughts' path
router.use('/thoughts', thoughtRoutes);

// Mounting user routes under the '/users' path
router.use('/users', userRoutes);

// Exporting the router
module.exports = router;
