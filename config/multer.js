const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadFolder = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,uploadFolder) 
    },
    filename:(req,file,cb)=>{
        const ext = file.originalname.split('.').pop();
        cb(null,`${Date.now()}.${ext}`)
    }
});

module.exports = storage;