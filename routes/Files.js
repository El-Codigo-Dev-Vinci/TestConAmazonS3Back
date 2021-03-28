const express = require('express')
const router = express.Router();
const File = require('../models/File');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile } = require('../s3')

 router.get('/:key', (req, res) => {     
    res.send("Get all routes")
 })

 router.post('/', upload.single('file'), async (req, res) => {    
   const file = req.file
   console.log(file)
   const result = await uploadFile(file)
   console.log(result)
    //const newFile = new File(file)
    res.send("was fine")
 })



 module.exports = router;