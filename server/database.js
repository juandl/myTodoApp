import Mongoose from 'mongoose';

Mongoose.connect('mongodb://mongo:27017/app_todo_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

Mongoose.connection.on('error', (err) => {
  console.log(`mongoose error`, err);
});

Mongoose.connection.on('connected', (err, res) => {
  console.log(`mongoose is connected`);
});
