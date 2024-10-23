const Cabecera = require('../models/Cabecera');
const obtenerCabecera= async(req,res)=>{
    let cab= await Cabecera.find().populate('file');
    return res.json({
        ok: true,
        cab
    });
}


const crearCabecera=async (req,res)=>{
    let cab = await Cabecera.findOne({nombre: req.body.nombre});    
    console.log(req.body);
    if (cab){
        return res.status(400).json({
            ok: false,
            msg: 'la cabecera ya existe'
        })
    }

    try{
        cab = new Cabecera(req.body.header);
        cab.file = req.body.archivo;
        await cab.save();
        return res.status(201).json({
            "ok": true,
            msg: "nueva cabecera",
            cab
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


const actualizarCabecera=async(req,res)=>{
    const cabId = req.params.id;
    try{
        const cab =await Cabecera.findById(cabId);
        if (!cab ) {
            return res.status(404).json({
                ok: false,
                msg: 'La cabecera no existe por ese id'
            });
        }

        const nuevaCab = req.body

        const cabActualizada = await Cabecera.findByIdAndUpdate(cabId,nuevaCab, {new:true});
        return res.json({
            ok: true,
            cab: nuevaCab
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const eliminarCabecera=async (req,res)=>{
    const cabId = req.params.id;
    try{
        const cab =await Cabecera.findById(cadId);
        if (!cab ) {
            return res.status(404).json({
                ok: false,
                msg: 'la cabecera no existe por ese id'
            });
        }

        await Cabecera.findByIdAndDelete(ventaId);
        return res.json({
            ok: true,
            msg: "Se borro la cabecera"
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
    obtenerCabecera,
    crearCabecera,
    actualizarCabecera,
    eliminarCabecera
}