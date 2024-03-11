const { Schema, model } = require('mongoose'); // Importing necessary modules from mongoose
const reactionSchema = require('./Reaction'); // Importing the reaction schema

// Defining the thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: { // Text content of the thought
      type: String, // Data type for the thought text
      required: true, // Thought text is required
      minlength: 1, // Minimum length of the thought text
      maxlength: 280, // Maximum length of the thought text
    },
    createdAt: { // Timestamp for when the thought was created
      type: Date, // Data type for the timestamp
      default: Date.now, // Default value is the current timestamp
      get: timestamp => new Date(timestamp).toLocaleString(), // Custom getter to format the timestamp
    },
    username: { // Username of the user who created the thought
      type: String, // Data type for the username
      required: true, // Username is required
    },
    reactions: [reactionSchema], // Array of reactions associated with the thought
  },
  {
    toJSON: { getters: true, virtuals: true }, // Adding getters and virtuals to JSON output
    id: false, // Excluding the '_id' field from the schema
  },
);

// Defining a virtual property to get the count of reactions for a thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; // Returning the length of the reactions array
});

const Thought = model('thought', thoughtSchema); // Creating a model from the thought schema

module.exports = Thought; // Exporting the Thought model for use in other modules
