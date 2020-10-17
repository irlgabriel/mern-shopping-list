const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')
// Item Model
const User = require("../../models/User")

// @route POST api/users/register
// @desc Registers a new user
// @access Public
router.post('/register', (req, res) => {
  const { name, email, password } = req.body

  // Simple Validations
  if(!name || !email || !password) {
    return res.status(400).json({message: 'Please enter all fields!'})
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) { res.status(400).json({message: 'Email already registered!'}) }
    })

  // Create new User
  const newUser = new User({
    name, 
    email,
    password
  })

  // Encrypt password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => {
          jwt.sign(
            {
              id: user.id,
            },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  name: user.name
                }
              })
            }
          )

        })
    })
  })
})

// @route POST /api/users/login
// @desc logs in user
// @access public

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple validations
  if(!email || !password) {
    return res.status(400).json({message: "Please enter all fields"})
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({message: "User does not exist"})
    
      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({message: "Incorrect Password"})
          jwt.sign(
            {
              id: user.id,
            },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  name: user.name
                }
              })
            }
          )
        })
    })
})
// @route api/users/profile
// @desc Get user data
// @access Private
router.get('/profile', auth, (req, res) => {
  User.findById(req.user.id) 
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router;