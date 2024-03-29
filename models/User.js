const { Schema, model } = require('mongoose');

// Define the user schema
const userSchema = new Schema(
  {
    // Username of the user
    username: {
      type: String, // Data type is string
      unique: true, // Username must be unique
      required: true, // Username is required
      trim: true, // Trim whitespace from the username
      // Additional validation can be added here (e.g., minlength, maxlength, match)
    },
    // Email of the user
    email: {
      type: String, // Data type is string
      required: true, // Email is required
      unique: true, // Email must be unique
      // Email format validation using regex
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    // Array of thought IDs associated with the user
    thoughts: [
      {
        type: Schema.Types.ObjectId, // MongoDB ObjectId type
        ref: 'Thought', // Reference to the Thought model
      },
    ],
    // Array of user IDs representing friends of the user
    friends: [
      {
        type: Schema.Types.ObjectId, // MongoDB ObjectId type
        ref: 'User', // Reference to the User model
      },
    ],
  },
  {
    // Ensure that virtuals are enabled when converting to JSON
    toJSON: { virtuals: true },
    // Exclude the "_id" field from the schema
    id: false,
  }
);

// Define a virtual property to calculate the number of friends the user has
userSchema.virtual('friendCount').get(function () {
  return this.friends.length; // Return the length of the friends array
});

// Create a model based on the user schema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
