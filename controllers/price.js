const Precio = require('../models/Precio');


const obtenerPrecios= async(req,res)=>{
    let precios= await Precio.find();
    return res.json({
        ok: true,
        precios
    });
}


const crearPrecio=async (req,res)=>{
    const {descripcion}=req.body
    let precio = await Precio.findOne({descripcion: descripcion});
    if (precio){
        return res.status(400).json({
            ok: false,
            msg: 'El precio ya existe'
        })
    }
    try{

        precio = new Precio(req.body);

        await precio.save();
        return res.status(201).json({
            "ok": true,
            msg: "nuevo precio"
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



const actualizarPrecio=async(req,res)=>{
    const precioId = req.params.id;
    try{
        const precio =await Precio.findById(precioId);
        if (!precio ) {
            return res.status(404).json({
                ok: false,
                msg: 'El precio no existe por ese id'
            });
        }

        const nuevoPrecio = req.body

        const precioActualizado = await Precio.findByIdAndUpdate(precioId,nuevoPrecio, {new:true});
        return res.json({
            ok: true,
            precio: precioActualizado
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const eliminarPrecio=async (req,res)=>{
    const precioId = req.params.id;
    try{
        const precio =await Precio.findById(precioId);
        if (!precio ) {
            return res.status(404).json({
                ok: false,
                msg: 'El precio no existe por ese id'
            });
        }

        await Precio.findByIdAndDelete(precioId);
        return res.json({
            ok: true,
            msg: "Se borro el precio"
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
    crearPrecio,obtenerPrecios,eliminarPrecio, actualizarPrecio
}