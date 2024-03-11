// Importing necessary modules and models
const { ObjectId } = require('mongoose').Types; // ObjectId from mongoose Types
const { User, Thought, Reaction } = require('../models'); // Importing User, Thought, and Reaction models

// Exporting an object with controller methods
module.exports = {

  // Controller method to get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find(); // Finding all thoughts
      res.json(thoughts); // Sending JSON response with thoughts
    } catch (err) {
      console.error(err); // Logging error
      return res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to get a single thought by ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v'); // Finding thought by ID and excluding '__v' field
      thought ? res.json(thought) : res.status(404).json({ message: 'No thought found with that ID' }); // Sending thought if found, else sending 404 with error message
    } catch (err) {
      console.error(err); // Logging error
      return res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body); // Creating a new thought
      const updatedUser = await User.findOneAndUpdate(
        { username: req.body.username }, // Finding associated user by username
        { $push: { thoughts: thought._id } }, // Pushing thought ID to user's thoughts array
        { new: true } // Returning updated user
      );
      updatedUser ? res.json(thought) : res.status(404).json({ message: 'Associated user not found' }); // Sending thought if user found, else sending 404 with error message
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to update a thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Finding thought by ID
        { $set: req.body }, // Updating thought fields
        { runValidators: true, new: true } // Running validators and returning updated document
      );
      thought ? res.json(thought) : res.status(404).json({ message: 'No such thought exists!' }); // Sending updated thought if found, else sending 404 with error message
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to delete a thought by ID
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId }); // Finding and deleting thought by ID
      deletedThought ? res.status(200).json({ message: 'Thought deleted successfully', deletedThought }) : res.status(404).json({ message: 'No such thought exists' }); // Sending success message if thought deleted, else sending 404 with error message
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to create a new reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Finding thought by ID
        { $addToSet: { reactions: req.body } }, // Adding new reaction to reactions array
        { runValidators: true, new: true } // Running validators and returning updated document
      );
      thought ? res.status(200).json(thought) : res.status(404).json({ message: 'No such thought exists' }); // Sending updated thought if found, else sending 404 with error message
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  },

  // Controller method to delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Finding thought by ID
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Pulling specific reaction from reactions array
        { runValidators: true, new: true } // Running validators and returning updated document
      );
      thought ? res.status(200).json(thought) : res.status(404).json({ message: 'No such thought exists' }); // Sending updated thought if found, else sending 404 with error message
    } catch (err) {
      console.error(err); // Logging error
      res.status(500).json(err); // Sending 500 status with error JSON response
    }
  }

};
