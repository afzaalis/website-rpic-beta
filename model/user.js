const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3307,
  password: '',
  database: 'rpic',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Get user by email
const getUserByEmail = (email, callback) => {
  const query = 'SELECT id, name, email, password, role FROM user WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return callback(err);
    }
    if (results.length === 0) {
      console.log(`User with email ${email} not found`);
      return callback(null, null);
    }
    console.log(`User found: ${JSON.stringify(results[0])}`);
    callback(null, results[0]);
  });
};

// Add new user
const addUser = (user, callback) => {
  const { name, email, password, role } = user;
  const query = 'INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, password, role], (err, results) => {
    if (err) {
      console.error('Error inserting user into database:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = { getUserByEmail, addUser };
