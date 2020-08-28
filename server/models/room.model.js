const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Room', RoomSchema);
