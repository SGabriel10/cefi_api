const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const {generarTOKEN} = require('../helpers/jwt')

const logearUsuario = async (req,res)=>{
    const {email,password} = req.body;
    let usuario = await Usuario.findOne({email: email});
    if (!usuario){
        return res.status(400).json({
            "ok": false,
            msg: 'El usuario no existe con ese email'
        })
    }

    try{
        //const validPassword=bcrypt.compareSync(password, usuario.password);
        console.log(password,usuario.password);
        if (password==usuario.password){
            //generar JWT
            const token= await generarTOKEN(usuario.id,usuario.name);
            return res.json({
                "ok": true,
                msg: "login",
                uid: usuario.id,
                name: usuario.name,
                token
            })    
        }
        else{
            return res.status(400).json({
                "ok":false,
                msg: 'Password invalido'
            })
    }
    }
    catch (error){
        console.log(error);
        return res.status(500).json(
            {
                ok: false,
                msg:"Por favor hable con el administrador"
            })
    }
}

const renovarUsuario=async (req,res)=>{

    const uid=req.uid;
    const name=req.name;

    const token = await generarTOKEN(uid,name);
    res.json({
        "ok": true,
        msg: "renew",
        token,
        uid,
        name

    })
}

module.exports ={
    logearUsuario,
    renovarUsuario
}