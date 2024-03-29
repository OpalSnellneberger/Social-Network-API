// Importing necessary modules and functions
const connection = require('../config/connection');
const { Student, Course } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

// Error handling for the connection
connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
  process.exit(1); // Exit process with error code 1
});

// Once the connection is open, execute the seeding process
connection.once('open', async () => {
  try {
    console.log('Connected to MongoDB');

    // Dropping existing collections if they exist
    await Promise.all([
      connection.db.dropCollection('courses'),
      connection.db.dropCollection('students')
    ]);
    console.log('Dropped existing collections');

    // Generating student data
    const students = Array.from({ length: 20 }, () => {
      // Generate random assignments for each student
      const assignments = getRandomAssignments(20);
      // Generate random full name for each student
      const fullName = getRandomName();
      const [first, last] = fullName.split(' ');
      // Generate random GitHub username for each student
      const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
      return { first, last, github, assignments };
    });

    // Inserting student data into the 'students' collection
    const insertedStudents = await Student.insertMany(students);
    console.log('Inserted students data into the database');

    // Inserting course data into the 'courses' collection
    await Course.create({
      courseName: 'UCLA',
      inPerson: false,
      students: insertedStudents.map(({ _id }) => _id)
    });
    console.log('Inserted course data into the database');

    // Logging the generated students' data
    console.table(students);

    // Logging seeding completion
    console.info('Seeding complete!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    process.exit(0); // Exit process with success code
  }
});
