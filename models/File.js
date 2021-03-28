const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    key: String,
    nameFile: String,
    linkFile: String    
})

module.exports = mongoose.model('File', FileSchema);