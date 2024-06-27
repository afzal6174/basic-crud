const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", registrationSchema);
