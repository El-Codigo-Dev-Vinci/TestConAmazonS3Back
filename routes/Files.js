const express = require('express')
const router = express.Router();
const File = require('../models/File')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFileStream } = require('../s3')

 router.get('/:key', (req, res) => {   
   const key = req.params.key
   const readStream = getFileStream(key)
 
   readStream.pipe(res)
 })

 router.get('/', async (req, res) => {    
   try{      
      const response = await File.find();
      res.status(200).json(response)
   }
   catch(error){
      res.send("Try later: "+ error)
   }   
 })

 router.post('/', upload.single('file'), async (req, res) => {   
   const file = req.file

   const result = await uploadFile(file)
   const newFile = new File({
      key:result.Key,
      fileName: req.body.fileName,
      linkFile: result.Location,
      creationDate: req.body.creationDate
   })
   console.log(req.body.creationDate)
   try{
      const response = await newFile.save();
      res.status(201).json(response)
      
   }catch(err){
      res.send("Error: "+ err);
   }        
 })



 module.exports = router;