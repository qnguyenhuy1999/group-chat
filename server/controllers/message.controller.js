const status = require('http-status');

const Message = require('../models/message.model');

module.exports.get = async (req, res) => {
  const { roomId } = req.body;

  const messages = await Message.find({ room: roomId })
    .populate('user', 'fullname avatar -_id')
    .select('user text');

  return res.json({ messages });
};

module.exports.create = async (req, res) => {
  const { roomId, text } = req.body;

  try {
    const message = await Message.create({
      user: req.user.id,
      room: roomId,
      text,
    });

    return res.json({ message });
  } catch (err) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
