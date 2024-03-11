const router = require('express').Router(); // Importing Router from express
const {
  // Importing controller methods from thoughtController
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController'); // Importing controller methods

// Routes for handling thoughts
router.route('/')
  .get(getThoughts) // GET request to fetch all thoughts
  .post(createThought); // POST request to create a new thought

router.route('/:thoughtId')
  .get(getSingleThought) // GET request to fetch a single thought by ID
  .put(updateThought) // PUT request to update a thought by ID
  .delete(deleteThought); // DELETE request to delete a thought by ID

// Routes for handling reactions
router.route('/:thoughtId/reactions')
  .post(createReaction); // POST request to add a reaction to a thought

router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction); // DELETE request to delete a reaction from a thought

module.exports = router; // Exporting the router for use in other modules
