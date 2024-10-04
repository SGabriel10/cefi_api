const {check}= require('express-validator')
const {Router}= require('express');
const storage = require('../config/multer');
const multer = require('multer');
const uploader = multer({storage});
const router= Router();
const {uploadImage,obtenerImage} = require('../controllers/uploader');
router.get('/',obtenerImage);
router.post('/new',uploader.single('file'), uploadImage);
module.exports= router