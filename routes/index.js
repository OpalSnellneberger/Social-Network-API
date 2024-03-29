const router = require('express').Router(); // Importing Express Router
const apiRoutes = require('./api'); // Importing API routes

// Mount API routes
router.use('/api', apiRoutes);

// Handle unmatched routes with a 404 error
router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export the router module
module.exports = router;
