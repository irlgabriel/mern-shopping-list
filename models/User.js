const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = {
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now
  }
}

module.exports = User = mongoose.model('user', UserSchema)