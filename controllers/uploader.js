const Upload = require('../models/Upload');
const uploadImage=async(req,res)=>{
    try{
        const {file,body} = req;
        var image = null;
        if(file && body){
            const newImage = new Upload({
                nombre: 'logo',
                url: `http://localhost:4000/uploads/${file.filename}`
            })
            image = await newImage.save();
            res.set('Content-Type', 'image/jpeg');
            return res.json({
                ok: true,
                msg: "Se agrego la imagen",
                id: image._id
            }); 
        }else {
            console.log("no hay nada que agregar");
        }
           
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};
module.exports = {uploadImage};