const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is started on server port ${port}`);
});

const multer = require('multer');
const uploads = multer({
  dest: 'images',
});

app.post('/upload', uploads.single('avtar'), (req,res)=>{
  res.send();
})
