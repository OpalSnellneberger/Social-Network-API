const connection = require('../config/connection'); // Importing connection from configuration
const { User, Thought } = require('../models'); // Importing User and Thought models
const { getRandomName, getRandomAssignments } = require('./data'); // Importing helper functions for generating random data

// Handling connection error
connection.on('error', (err) => err);

// Once the connection is open, perform seeding
connection.once('open', async () => {
  console.log('connected'); // Logging connection status

  // Checking if 'courses' collection exists and dropping if it does
  let courseCheck = await connection.db.listCollections({ name: 'courses' }).toArray();
  if (courseCheck.length) {
    await connection.dropCollection('courses');
  }

  // Checking if 'students' collection exists and dropping if it does
  let studentsCheck = await connection.db.listCollections({ name: 'students' }).toArray();
  if (studentsCheck.length) {
    await connection.dropCollection('students');
  }

  // Generating student data
  const students = [];
  for (let i = 0; i < 20; i++) {
    const assignments = getRandomAssignments(20); // Generating random assignments for each student

    // Generating random full name, first name, last name, and GitHub username
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    // Adding student data to array
    students.push({
      first,
      last,
      github,
      assignments,
    });
  }

  // Inserting student data into 'students' collection
  const studentData = await Student.insertMany(students);

  // Inserting course data into 'courses' collection
  await Course.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...studentData.map(({_id}) => _id)],
  });

  console.table(students); // Logging generated student data
  console.info('Seeding complete!'); // Logging seeding completion
  process.exit(0); // Exiting the process
});
