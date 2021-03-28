const express = require('express')
const router = express.Router();
const File = require('../models/File')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const download = require('download-file')

const { uploadFile, deleteFile } = require('../s3') 

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

   try{
      const response = await newFile.save();
      res.status(201).json(response)
      
   }catch(err){
      res.send("Error: "+ err);
   }        
 })


 router.delete('/:key', async (req, res) => {
    try{
      const key = req.params.key;      
      const removedFile = await File.remove({ key: key })
      if (!removedFile) {
         return res
           .status(404)
           .send({ error: `The file doesn't exist` });
      }

      await deleteFile(key)      
      res.status(200).json(removedFile)
   }
   catch(error){
      res.json("Error: " + error)
   }

 })

 router.patch('/:key', async (req, res) => {
    try{
      const updatedFile = await File.updateOne(
         {key: req.params.key},
         {$set: {fileName: req.body.fileName}}
      )      

      res.json(updatedFile)
    }
    catch(error){
       res.json("Error" + error)
    }
 })

 module.exports = router;