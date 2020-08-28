const status = require('http-status');

const Room = require('../models/room.model');

module.exports.get = async (req, res) => {
  const rooms = await Room.find({
    user: { $in: [req.user._id] },
  }).select('name');

  return res.json({ rooms });
};

module.exports.create = async (req, res) => {
  const { name } = req.body;

  try {
    await Room.create({
      name,
      user: [req.user._id],
    });

    const room = await Room.findOne({ name }).select('name');

    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.register = async (req, res) => {
  const { roomId } = req.body;

  try {
    const room = await Room.findByIdAndUpdate(roomId, {
      $addToSet: { user: req.user.id },
    }).select('name');

    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.search = async (req, res) => {
  const { q } = req.body;

  const rooms = await Room.find({
    name: new RegExp(`.*${q}.*`),
    user: { $nin: [req.user._id] },
  }).select('name');

  return res.json({ rooms });
};
