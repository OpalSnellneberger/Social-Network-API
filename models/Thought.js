const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // Importing the reaction schema

// Define the thought schema
const thoughtSchema = new Schema(
  {
    // Text content of the thought
    thoughtText: {
      type: String, // Data type is string
      required: true, // Thought text is required
      minlength: 1, // Minimum length of thought text is 1 character
      maxlength: 280, // Maximum length of thought text is 280 characters
    },
    // Date and time when the thought was created
    createdAt: {
      type: Date, // Data type is date
      default: Date.now, // Default value is the current date and time
      // Convert the timestamp to a localized string format
      get: timestamp => new Date(timestamp).toLocaleString(),
    },
    // Username of the user who created the thought
    username: {
      type: String, // Data type is string
      required: true, // Username is required
      // Additional validation can be added here (e.g., minlength, maxlength, match)
    },
    // Array of reactions associated with the thought, referencing the reaction schema
    reactions: [reactionSchema], // Using the reaction schema to define the structure of reactions array
  },
  {
    // Ensure that getters and virtuals are enabled when converting to JSON
    toJSON: { getters: true, virtuals: true },
    // Exclude the "_id" field from the schema
    id: false,
  }
);

// Define a virtual property to calculate the number of reactions associated with the thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; // Return the length of the reactions array
});

// Create a model based on the thought schema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;
