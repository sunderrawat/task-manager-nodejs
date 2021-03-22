const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});


// create a user model
// const User = mongoose.model('User', {
//   name: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minLength: [7, 'Length is more than 6'],
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes('password')) {
//         throw new Error('Password not contains password');
//       }
//     },
//   },
//   age: {
//     type: Number,
//     validate(value) {
//       if (value < 0) {
//         throw new Error('Age must be greather or equal zero');
//       }
//     },
//   },
// });

// const me = new User({
//   name: 'Ravi',
//   age: 24,
//   password: 'goodPAssword',
// });

// //save user on database
// me.save()
//   .then(() => console.log(me))
//   .catch(error => console.log(error));

// //create a tasks model

// const Task = mongoose.model('Tasks', {
//   Description: {
//     type: String,
//     required: true,
//     trim: true,
//     minLength: [3, 'length more than 3']
//   },
//   Completed: {
//     type: Boolean,
//     default: false
//   },
// });

// const task1 = new Task({
//   Description: 'Dud pilana',
//   Completed: false,
// });

// const task3 = new Task({
//   Description: '   Sarso katni  or kaat di    ',
//   Completed: true,
// });

// save task on database
// task1
//   .save()
//   .then(() => console.log(task1))
//   .catch(error => console.log(error));
// task3
//   .save()
//   .then(() => console.log(task3))
//   .catch(error => console.log(error));
