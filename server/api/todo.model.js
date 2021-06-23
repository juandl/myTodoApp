import Mongoose from 'mongoose';
let Schema = Mongoose.Schema;

const schema = Mongoose.Schema({
  text: {
    type: String,
    index: true,
    required: true,
  },
  user: {
    type: String,
  },
});

schema.index({
  user: 'text',
});

export default Mongoose.model('todos', schema);
