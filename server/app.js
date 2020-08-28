const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const socket_io = require('socket.io');

const User = require('./models/user.model');
const Message = require('./models/message.model');

try {
  mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log(err);
}

const corsOptions = {
  origin: process.env.CLIENT_APP,
  optionsSuccessStatus: 200,
};
const app = express();
const io = socket_io();

app.io = io;

app.set('socketio', io);

io.use(async (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const email = socket.handshake.query.token.split(' ')[1];
    const user = await User.findOne({ email });
    socket.user = user;

    next();
  } else {
    next(new Error('Authentication error'));
  }
}).on('connect', (socket) => {
  socket.on('join', (roomId) => {
    socket.join(roomId);
  });

  socket.on('getAllMessage', async (roomId) => {
    const messages = await Message.find({ room: roomId })
      .populate('user', 'fullname avatar -_id')
      .select('user text createdAt');

    socket.emit('readAllMessages', messages);
  });

  socket.on('message', async (data) => {
    const { roomId, text } = data;

    const newMessage = await Message.create({
      user: socket.user._id,
      room: roomId,
      text,
    });

    const message = await Message.findById(newMessage.id)
      .populate('user', 'fullname avatar -_id')
      .select('user text createdAt');

    io.to(roomId).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

const authMiddleware = require('./middlewares/auth.middleware');

const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');
const messageRouter = require('./routes/message');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/api/user', userRouter);
app.use('/api/room', authMiddleware, roomRouter);
app.use('/api/message', authMiddleware, messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
