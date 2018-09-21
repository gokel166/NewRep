const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Load user model
const User = require('../../models/User');

// get api/users/test
// access --- public
router.get('/test', (req, res) => {
  res.json({ msg: 'User works' });
});

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      }
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.json(user)).catch(err => console.log(err));
        });
      });
    });
});

// get api/users/login
// Login user / Returning JWT
// access --- public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.email;

  // Find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        res.json({ msg: 'Success' });
      } else {
        return res.status(400).json({ password: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;
