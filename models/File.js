const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    key: {
        type: String,
        require:true,
        unique:true
    },
    fileName:{
        type: String,
        require:true,        
    },
    linkFile:{
        type: String,
        require:true,
        unique:true
    },
    creationDate:{
        type: Date,
        require: true,        
    },
    path:{
        type: String,
        require:true
    },    
})

module.exports = mongoose.model('File', FileSchema);