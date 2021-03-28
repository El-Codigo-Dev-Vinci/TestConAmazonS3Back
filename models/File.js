const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    key: String,
    fileName: String,
    linkFile: String    
})

module.exports = mongoose.model('File', FileSchema);