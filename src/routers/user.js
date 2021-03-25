const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../model/user');
const auth = require('../middelware/auth');

const router = new express.Router();

//signup router
router.post('/users/signup', async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(208).send('Already registered !');
  }
  try {
    const user = new User(req.body);
    const token = await user.genrateAutToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(401).send(e);
  }
});

// user login post request
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.genrateAutToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//logout user from database
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

//logout from all devices
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});

//make endpoint for reading self user data
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

//update user details
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'email', 'password'];
  const isValidOperations = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperations) {
    return res.status(400).send({ error: 'Indvaild operation' });
  }
  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete self user from database
router.delete('/users/me', auth, async (req, res) => {
  try {
    req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//uploading profile image of user
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(undefined, true);
  },
});

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
      req.user.avatar = buffer;
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  },
  (error, req, res, cb) => {
    res.status(400).send({ Error: error.message });
  }
);

//delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(400).send(e);
  }
});

//get avatar
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
