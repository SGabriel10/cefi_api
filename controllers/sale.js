const Venta = require('../models/Venta');
const Cliente = require('../models/Cliente');
const obtenerVentas= async(req,res)=>{
    let ventas= await Venta.find().populate("cliente","name last_name ruc");

    return res.json({
        ok: true,
        ventas
    });
}


const crearVenta=async (req,res)=>{
    console.log(req.body);
    let venta = await Venta.findOne();
    let cliente = await Cliente.findOne({name: { $regex: req.body.cliente.split(' ').join("|"), $options: "i" }})
    /*if (venta){
        return res.status(400).json({
            ok: false,
            msg: 'la venta ya existe'
        })
    }*/

    try{

        venta = new Venta(req.body);
        venta.cliente= cliente;

        await venta.save();
        return res.status(201).json({
            "ok": true,
            msg: "nueva venta",
            venta
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


const actualizarVenta=async(req,res)=>{
    const ventaId = req.params.id;
    try{
        const venta =await Venta.findById(ventaId);
        if (!venta ) {
            return res.status(404).json({
                ok: false,
                msg: 'La venta no existe por ese id'
            });
        }

        const nuevaVenta = req.body

        const ventaActualizada = await VentaDetalle.findByIdAndUpdate(ventaId,nuevaVenta, {new:true});
        return res.json({
            ok: true,
            venta: ventaActualizada
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const eliminarVenta=async (req,res)=>{
    const ventaId = req.params.id;
    try{
        const venta =await Venta.findById(ventaId);
        if (!venta ) {
            return res.status(404).json({
                ok: false,
                msg: 'la venta no existe por ese id'
            });
        }

        await Venta.findByIdAndDelete(ventaId);
        return res.json({
            ok: true,
            msg: "Se borro la venta"
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
    obtenerVentas,
    crearVenta,
    actualizarVenta,
    eliminarVenta
}