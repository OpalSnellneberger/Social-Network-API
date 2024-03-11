// Importing necessary components from the mongoose library. 
// Schema is used to define the structure of the document, 
// model is used to create a model based on a schema, 
// and Types provides access to Mongoose's ObjectId data type.
const { Schema, model, Types } = require('mongoose');

// User Schema definition
const userSchema = new Schema(
  {
    username: { // Username field
      type: String, // Data type for username
      unique: true, // Username must be unique
      required: true, // Username is required
      trim: true, // Trimming whitespace from username
    },
    email: { // Email field
      type: String, // Data type for email
      required: true, // Email is required
      unique: true, // Email must be unique
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex pattern for email validation
    },
    thoughts: [ // Array of ObjectId values referencing Thought model
      {
        type: Schema.Types.ObjectId, // Data type for thoughts array
        ref: 'Thought', // Reference to the Thought model
      },
    ],
    friends: [ // Array of ObjectId values referencing User model (for friends)
      {
        type: Schema.Types.ObjectId, // Data type for friends array
        ref: 'User', // Reference to the User model
      },
    ],
  },
  {
    toJSON: { virtuals: true }, // Enables virtuals to be included when converting document to JSON
    id: false, // Disables inclusion of the default _id field in the document
  },
);

// Define a virtual property called friendCount. 
// A virtual property is not stored in the MongoDB collection but can be calculated or derived when querying the document. 
// In this case, it calculates the length of the friends array.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length; // Returning the length of the friends array
});

// Create a Mongoose model named User based on the defined schema (userSchema). 
// The first parameter is the singular name of the collection that will be created in MongoDB, and the second parameter is the schema.
const User = model('user', userSchema);

// Export the User model so that it can be used in other parts of the application
module.exports = User;
