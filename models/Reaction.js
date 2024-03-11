const { Schema, Types } = require('mongoose'); // Importing necessary modules from mongoose

// Defining the reaction schema
const reactionSchema = new Schema(
  {
    reactionId: { // Unique identifier for the reaction
      type: Schema.Types.ObjectId, // Data type for the ID
      default: () => new Types.ObjectId(), // Generating a new ObjectId by default
    },
    reactionBody: { // Body of the reaction
      type: String, // Data type for the reaction body
      required: true, // Reaction body is required
      maxlength: 280, // Maximum length of the reaction body
    },
    username: { // Username of the user who made the reaction
      type: String, // Data type for the username
      required: true, // Username is required
    },
    createdAt: { // Timestamp for when the reaction was created
      type: Date, // Data type for the timestamp
      default: Date.now, // Default value is the current timestamp
      get: timestamp => new Date(timestamp).toLocaleString(), // Custom getter to format the timestamp
    },
  },
  {
    toJSON: { getters: true }, // Adding getters to JSON output
    id: false, // Excluding the '_id' field from the schema
  }
);

module.exports = reactionSchema; // Exporting the reaction schema for use in other modules
