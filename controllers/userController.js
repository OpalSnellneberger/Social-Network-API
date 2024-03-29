const { Types } = require('mongoose'); // Accessing ObjectId type from Mongoose
const { User, Thought } = require('../models'); // Importing models for User and Thought

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId).select('-__v');
      user ? res.json(user) : res.status(404).json({ message: 'No user found with that ID' });
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        runValidators: true,
        new: true
      });
      user ? res.json(user) : res.status(404).json({ message: 'No user found with that ID' });
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      await Thought.deleteMany({ username: deletedUser.username });
      res.status(200).json({
        message: 'User and associated thoughts deleted successfully',
        deletedUser
      });
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.body.friendId || req.params.friendId } },
        { new: true }
      );
      user ? res.status(200).json(user) : res.status(404).json({ message: 'No such user exists' });
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      const friendRemoved = !user.friends.includes(req.params.friendId);
      friendRemoved ? res.status(200).json({ message: 'Friend removed from friend list', user }) : res.json({ message: 'Something went wrong' });
    } catch (err) {
      handleServerError(res, err);
    }
  }
};

// Function to handle server errors
function handleServerError(res, err) {
  console.error(err);
  res.status(500).json(err);
}
