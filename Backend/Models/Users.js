const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
      type: String,
      required: true,
    },
},
{
    timestamps: true
}
);

const User = mongoose.model('users', userSchema);
module.exports = User;