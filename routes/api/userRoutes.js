const router = require('express').Router(); // Importing Router from express
const {
  // Importing controller methods from userController
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController'); // Importing controller methods

// Routes for handling users
router.route('/')
  .get(getUsers) // GET request to fetch all users
  .post(createUser); // POST request to create a new user

router.route('/:userId')
  .get(getSingleUser) // GET request to fetch a single user by ID
  .put(updateUser) // PUT request to update a user by ID
  .delete(deleteUser); // DELETE request to delete a user by ID

// Routes for handling friends
router.route('/:userId/friends')
  .post(addFriend); // POST request to add a friend to a user's friendlist

router.route('/:userId/friends/:friendId')
  .delete(removeFriend); // DELETE request to remove a friend from a user's friendlist

module.exports = router; // Exporting the router for use in other modules
