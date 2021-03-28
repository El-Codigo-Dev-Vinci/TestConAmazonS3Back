const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    content: String,
    author: String            
})

module.exports = mongoose.model('File', FileSchema);