const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        fs.mkdir('./upload/',(err)=>{
            cb(null,path.join(__dirname, '../upload/')) 
        });
    },
    filename:(req,file,cb)=>{
        const ext = file.originalname.split('.').pop();
        cb(null,`logo.${ext}`)
    }
});

module.exports = storage;