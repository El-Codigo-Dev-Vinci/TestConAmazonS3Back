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
   const result = await uploadFile(file)
   const newFile = new File({
      key:result.Key,
      fileName: file.originalname,
      linkFile: result.Location
   })
   console.log(newFile)
   console.log(result)
   try{
      const savedFile = await newFile.save();
      res.json(savedFile);
   }catch(err){
      res.json({message: err});
   }
    //const newFile = new File(file)
    res.send("was fine")
 })



 module.exports = router;