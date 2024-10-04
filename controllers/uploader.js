const Upload = require('../models/Upload');

const uploadImage=async(req,res)=>{
    try{
        const {file,body} = req;
        if(file && body){
            const newImage = new Upload({
                nombre: 'logo',
                url: `http:localhost:4000/upload/${file.filename}`
            })
            await newImage.save();
        }
        return res.json({
            ok: true,
            msg: "Se agrego la imagen"
        });    
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

const obtenerImage=async(req,res)=>{

}

module.exports = {uploadImage,obtenerImage};