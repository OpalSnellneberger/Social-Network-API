// Importing necessary modules and models
const { ObjectId } = require('mongoose').Types; // ObjectId from mongoose Types
const { User, Thought } = require('../models'); // Importing User and Thought models

// Exporting an object with controller methods
module.exports = {

  // Controller method to get all users
  async getUsers(req, res) {
    try {
      const users = await User.find(); // Finding all users
      res.json(users); // Sending JSON response with users
    } catch (err) {
      console.error(err); // Logging error
      return res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v'); // Finding user by ID and excluding '__v' field
      user ? res.json(user) : res.status(404).json({ message: 'No user found with that ID' }); // Sending user if found, else sending 404 with error message
    } catch (err) {
      console.error(err); // Logging error
      return res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body); // Creating a new user
      res.json(user); // Sending JSON response with new user
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to update a user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, // Finding user by ID
        { $set: req.body }, // Updating user fields
        { runValidators: true, new: true } // Running validators and returning updated document
      );
      user ? res.json(user) : res.status(404).json({ message: 'No user found with that ID' }); // Sending updated user if found, else sending 404 with error message
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to delete a user by ID
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId }); // Finding and deleting user by ID
      if (!deletedUser) {
        return res.status(404).json({ message: 'No such user exists' }); // Sending 404 with error message if user not found
      }
      await Thought.deleteMany({ username: deletedUser.username }); // Deleting all thoughts associated with the deleted user
      res.status(200).json({ // Sending success message with deleted user
        message: 'User and associated thoughts deleted successfully',
        deletedUser
      });
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to add a friend to a user's friendlist
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, // Finding user by ID
        { $addToSet: { friends: req.body.friendId || req.params.friendId } }, // Adding friend to friends array
        { new: true } // Returning updated document
      );
      user ? res.status(200).json(user) : res.status(404).json({ message: 'No such user exists' }); // Sending updated user if found, else sending 404 with error message
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to remove a friend from a user's friendlist
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId }, // Finding user by ID
        { $pull: { friends: req.params.friendId } }, // Removing friend from friends array
        { new: true } // Returning updated document
      );
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' }); // Sending 404 with error message if user not found
      }
      const friendRemoved = !user.friends.includes(req.params.friendId); // Checking if friend is successfully removed
      friendRemoved ? res.status(200).json({ message: 'Friend removed from friendlist', user }) : res.json({ message: 'Something went wrong' }); // Sending success message if friend removed, else sending generic message
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  }

};
