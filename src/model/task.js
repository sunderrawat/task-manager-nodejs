const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = Schema(
  {
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      rel: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
