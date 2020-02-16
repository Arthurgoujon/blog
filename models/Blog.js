const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date
  }
});

module.exports = mongoose.model('blog', BlogSchema);
