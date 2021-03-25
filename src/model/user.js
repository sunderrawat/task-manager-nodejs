const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const Schema = mongoose.Schema;
const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  avatar: {
    type: Buffer
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
}, {
  timestamps: true
});

userSchema.virtual('tasks', {
  ref: 'Tasks',
  localField: '_id',
  foreignField: 'owner',
});

//hiding private data from user we can fun name toJSON because this name provie nothing changement in routes
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

//genrating web tokens
userSchema.methods.genrateAutToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'sunderrawat');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//login user function
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('unable to login');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

// save password in hash format
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

//deleting all task of before deleting user
userSchema.pre('remove', async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
