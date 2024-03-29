const router = require('express').Router(); // Importing Express Router
const {
  // Importing controller methods for handling user-related operations
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController'); // Importing controller methods

// Routes for users
router.route('/')
  .get(getUsers) // Get all users
  .post(createUser); // Create a new user

router.route('/:userId')
  .get(getSingleUser) // Get a single user by their ID
  .put(updateUser) // Update a user by their ID
  .delete(deleteUser); // Delete a user by their ID

// Routes for managing user's friends
router.route('/:userId/friends')
  .post(addFriend); // Add a friend to a user's friend list

router.route('/:userId/friends/:friendId')
  .delete(removeFriend); // Remove a friend from a user's friend list

module.exports = router; // Exporting the router
