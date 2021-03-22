const express = require('express');
const User = require('./model/users');
require('./db/mongoose');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is started on server port ${port}`);
});

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(e => {
      res.status(400).send(e);
      console.log(e);
    });
});
