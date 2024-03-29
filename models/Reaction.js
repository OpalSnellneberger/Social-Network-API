const { Schema, Types } = require('mongoose');

// Define the reaction schema
const reactionSchema = new Schema(
  {
    // Unique identifier for the reaction
    reactionId: {
      type: Schema.Types.ObjectId, // MongoDB ObjectId type
      default: () => new Types.ObjectId(), // Default value is a new ObjectId
    },
    // Content of the reaction
    reactionBody: {
      type: String, // Data type is string
      required: true, // Reaction body is required
      maxlength: 280, // Maximum length of reaction body is 280 characters
    },
    // Username of the user who created the reaction
    username: {
      type: String, // Data type is string
      required: true, // Username is required
    },
    // Date and time when the reaction was created
    createdAt: {
      type: Date, // Data type is date
      default: Date.now, // Default value is the current date and time
      // Convert the timestamp to a localized string format
      get: timestamp => new Date(timestamp).toLocaleString(),
    },
  },
  {
    // Ensure that getters are enabled when converting to JSON
    toJSON: { getters: true },
    // Exclude the "_id" field from the schema
    id: false,
  }
);

// Export the reaction schema
module.exports = reactionSchema;
