const { Types } = require('mongoose'); // Accessing ObjectId type from Mongoose
const { User, Thought } = require('../models'); // Importing models for User and Thought

module.exports = {
  // Retrieve all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Retrieve a single thought by its ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).select('-__v');
      thought ? res.json(thought) : res.status(404).json({ message: 'No thought found with that ID' });
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const updatedUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      updatedUser ? res.json(thought) : res.status(404).json({ message: 'Associated user not found' });
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Update a thought by its ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        runValidators: true,
        new: true
      });
      thought ? res.json(thought) : res.status(404).json({ message: 'No such thought exists!' });
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Delete a thought by its ID
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      deletedThought ? res.status(200).json({ message: 'Thought deleted successfully', deletedThought }) : res.status(404).json({ message: 'No such thought exists' });
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Add a reaction to a thought by its ID
  async createReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought ? res.status(200).json(thought) : res.status(404).json({ message: 'No such thought exists' });
    } catch (err) {
      handleServerError(res, err);
    }
  },

  // Delete a reaction from a thought by its ID and reaction ID
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      thought ? res.status(200).json(thought) : res.status(404).json({ message: 'No such thought exists' });
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
