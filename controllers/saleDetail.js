const VentaDetalle = require('../models/VentaDetalle');

const obtenerDetalles= async(req,res)=>{
    let detalles= await VentaDetalle.find().populate("producto","descripcion");

    return res.json({
        ok: true,
        detalles
    });
}


const crearDetalle=async (req,res)=>{
    console.log(req.body);

    try{

        let detalle = new VentaDetalle(req.body);
        detalle.producto= req.body.detail.product;
        detalle.venta= req.body.venta;
        detalle.cantidad = req.body.detail.cantidad

        await detalle.save();
        return res.status(201).json({
            "ok": true,
            msg: "nueva categoria"
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


const actualizarDetalle=async(req,res)=>{
    const ventaDetalleId = req.params.id;
    try{
        const detalle =await VentaDetalle.findById(ventaDetalleId);
        if (!detalle ) {
            return res.status(404).json({
                ok: false,
                msg: 'El detalle no existe por ese id'
            });
        }

        const nuevoDetalle = req.body

        const detalleActualizado = await VentaDetalle.findByIdAndUpdate(ventaDetalleId,nuevoDetalle, {new:true});
        return res.json({
            ok: true,
            detalle: detalleActualizado
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const eliminarDetalle=async (req,res)=>{
    const ventaDetalleId = req.params.id;
    try{
        const detalle =await VentaDetalle.findById(ventaDetalleId);
        if (!detalle ) {
            return res.status(404).json({
                ok: false,
                msg: 'el detalle no existe por ese id'
            });
        }

        await VentaDetalle.findByIdAndDelete(ventaDetalleId);
        return res.json({
            ok: true,
            msg: "Se borro el detalle"
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
    obtenerDetalles,
    crearDetalle,
    actualizarDetalle,
    eliminarDetalle
}