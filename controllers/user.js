const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const {generarTOKEN} = require('../helpers/jwt')


const obtenerUsuarios= async(req,res)=>{
    let usuarios= await Usuario.find();
    return res.json({
        ok: true,
        usuarios
    });
}


const crearUsuario=async (req,res)=>{
    const {email,password}=req.body
    let usuario = await Usuario.findOne({email: email});
    //console.log(usuario);
    if (usuario){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario ya existe'
        })
    }
    try{

        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = await bcrypt.genSaltSync(10);
        usuario.password= await bcrypt.hashSync(password, salt);

        await usuario.save();
        const token= await generarTOKEN(usuario.id,usuario.name);
        return res.status(201).json({
            "ok": true,
            msg: "nuevo usuario",
            uid: usuario.id,
            name: usuario.name,
            token

          });
    }catch (error){
        console.log(error);
        res.status(500).json(
            {
            ok: false,
            msg:"Por favor hable con el administrador"
    })
    }
}



const getUsers=(req, res) =>{
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10
    }

    Usuario.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function (err, doc) {
            if(err) { res.status(500).json(err); return; };
            res.status(200).json(doc);
        });
}


const actualizarUsuario=async(req,res)=>{
    const usuarioId = req.params.id;
    try{
        const usuario =await Usuario.findById(usuarioId);
        if (!usuario ) {
            return res.status(404).json({
                ok: false,
                msg: 'el usuario no existe por ese id'
            });
        }

        const nuevoUsuario = req.body

        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId,nuevoUsuario, {new:true});
        return res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const logearUsuario = async (req,res)=>{
    const {email,password} = req.body;
    let usuario = await Usuario.findOne({email: email});
    //console.log(usuario);
    if (!usuario){
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe con ese email'
        })
    }

    try{
        const validPassword=bcrypt.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Password valido'
            })
        }
        //generar JWT
        const token= await generarTOKEN(usuario.id,usuario.name);
        res.json({
            "ok": true,
            msg: "login",
            uid: usuario.id,
            name: usuario.name,
            token
        })
    }
    catch (error){
            console.log(error);
            res.status(500).json(
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
        token

    })
}

const eliminarUsuario=async (req,res)=>{
        const userId = req.params.id;
        try{
            const user =await Usuario.findById(userId);
            if (!user ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'el usuario no existe por ese id'
                });
            }
            /*if(evento.user !==req.uid){
                return res.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegios de editar este evento'
                });
            }*/

            await Usuario.findByIdAndDelete(userId);
            return res.json({
                ok: true,
                evento: "Usuario Borrado"
            });
        }catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
        }
}

module.exports ={
    logearUsuario,
    renovarUsuario,
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    getUsers
}