const router = require('express').Router(); // Importing Express Router
const {
  // Importing controller methods for handling thought-related operations
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController'); // Importing controller methods

// Routes for thoughts
router.route('/')
  .get(getThoughts) // Get all thoughts
  .post(createThought); // Create a new thought

router.route('/:thoughtId')
  .get(getSingleThought) // Get a single thought by its ID
  .put(updateThought) // Update a thought by its ID
  .delete(deleteThought); // Delete a thought by its ID

// Routes for reactions associated with a specific thought
router.route('/:thoughtId/reactions')
  .post(createReaction); // Add a reaction to a thought

router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction); // Delete a reaction from a thought

module.exports = router; // Exporting the router
