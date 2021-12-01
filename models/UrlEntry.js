const mongoose = require('mongoose');
const UrlEntrySchema = new mongoose.Schema({  
  url: String,
  code: String,
  createdAt: Date
});
module.exports = mongoose.model('UrlEntry', UrlEntrySchema);