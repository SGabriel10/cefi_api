const {Router}= require('express');
const storage = require('../config/multer');
const multer = require('multer');
const uploader = multer({storage});
const router= Router();
const {uploadImage} = require('../controllers/uploader');
router.post('/new',uploader.single('file'), uploadImage);
module.exports= router