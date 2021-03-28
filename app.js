const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const FileRoute = require('./routes/Files');
const cors = require('cors');
const app = express();
let port = process.env.PORT || 3001;

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true    
    },
    () => console.log("Listening on port 3001")
)

const db = mongoose.connection;

db.once('open', () => {
    console.log("Connected to MongoDB")
})

app.use(bodyParser.json());
app.use(cors())
app.use('/files', FileRoute)

app.listen(port)