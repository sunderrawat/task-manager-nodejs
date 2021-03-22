const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// // create a user model
// const User = mongoose.model('User', {
//   name: {
//     type: String,
//   },
//   age: {
//     type: Number,
//   },
// });

// const me = new User({
//   name: 'sunder',
//   age: 25,
// });

// me.save()
//   .then(() => console.log(me))
//   .catch(error => console.log(error));

// //create a tasks model

const Task = mongoose.model('Tasks', {
  Description: {
    type: String,
  },
  Completed: {
    type: Boolean,
  },
});

const task1 = new Task({
  Description: 'Dud pilana',
  Completed: false,
});

const task2 = new Task({
  Description: 'Sarso katni',
  Completed: true,
});

task1
  .save()
  .then(() => console.log(task1))
  .catch(error => console.log(error));
task2
  .save()
  .then(() => console.log(task2))
  .catch(error => console.log(error));

