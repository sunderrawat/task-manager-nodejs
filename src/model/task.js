const mongoose = require('mongoose');

const Task = mongoose.model('Tasks', {
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, 'length more than 3'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
