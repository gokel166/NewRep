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

module.exports = router;
