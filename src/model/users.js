const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    toLowerCase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Provide an valid email');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [7, 'Length is more than 6'],
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password not contains password');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be greather or equal zero');
      }
    },
  },
});

module.exports = User;
