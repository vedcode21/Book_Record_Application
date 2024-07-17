// models/userModel.js or equivalent
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subscriptionType: {
    type: String,
    required: true,
  },
  subscriptionDate: {
    type: Date,
    required: true,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
