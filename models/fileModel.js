const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    urls: {
      type: [String],
      default: []
    }
  });

module.exports = mongoose.model('File', fileSchema);
