const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is started on server port ${port}`);
});

// const User = require('./model/user');
// const Task = require('./model/task');

// const main = async function () {
//   // const task = await Task.findById('605c4075146886422aee24d4');
//   // await task.populate('owner').execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById('605beed67f266e31c527eae4');
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks);
// };
// main();
