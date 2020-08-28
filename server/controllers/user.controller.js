const status = require('http-status');

const User = require('../models/user.model');

module.exports.login = async (req, res) => {
  const { fullname, email, avatar } = req.body;

  const userExist = await User.findOne({ email }).select(
    'fullname email avatar -_id'
  );

  if (userExist) {
    return res.json({ user: userExist });
  } else {
    try {
      await User.create({
        fullname,
        email,
        avatar,
      });

      const user = await User.findOne({ email }).select(
        'fullname email avatar -_id'
      );

      return res.json({ user });
    } catch (err) {
      return res.status(status.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    }
  }
};

module.exports.getUser = async (req, res) => {
  // console.log(req.app.get('socketio'));

  const user = await User.findOne({ email: req.user.email }).select(
    'fullname email avatar -_id'
  );

  return res.json({ user });
};
