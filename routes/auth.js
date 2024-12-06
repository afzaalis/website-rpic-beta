const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { addUser, getUserByEmail } = require('../model/user');

// Signup endpoint
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  console.log('Signup data received:', { name, email, password }); // Log input data

  const role = 'customer';

  getUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (user) return res.status(400).json({ message: 'Email already taken' });

    // Gunakan bcrypt untuk menghasilkan hash dengan format $2a
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: err.message });
      console.log('Generated hash (format $2a):', hashedPassword);

      addUser({ name, email, password: hashedPassword, role }, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  });
});

// Login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login data received:', { email, password }); // Log input data

  getUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) {
      console.log(`User with email ${email} not found`);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found in database:', user); // Log user data

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error during bcrypt.compare:', err);
        return res.status(500).json({ error: err.message });
      }
      if (!isMatch) {
        console.log('Password mismatch:', { inputPassword: password, storedHash: user.password });
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      console.log('Login successful for user:', email);
      res.status(200).json({
        message: 'Login successful',
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    });
  });
});

module.exports = router;
