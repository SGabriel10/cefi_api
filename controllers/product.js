const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');
const obtenerProductos= async(req,res)=>{
    let productos= await Producto.find().populate("categoria","descripcion");

    return res.json({
        ok: true,
        productos
    });
}


const crearProducto=async (req,res)=>{
    const {categoria}=req.body;
    let catg = await Categoria.findOne({descripcion: categoria.selected });
    let producto = await Producto.findOne({descripcion: req.body.descripcion});
    if (producto){
        return res.status(400).json({
            ok: false,
            msg: 'El producto ya existe'
        })
    }

    try{

        producto = new Producto(req.body);
        producto.categoria= catg;

        await producto.save();
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


const actualizarProducto=async(req,res)=>{
    const productoId = req.params.id;
    try{
        const producto =await Producto.findById(productoId);
        if (!producto ) {
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe por ese id'
            });
        }

        const nuevoProducto = req.body

        const productoActualizada = await Producto.findByIdAndUpdate(productoId,nuevoProducto, {new:true});
        return res.json({
            ok: true,
            producto: productoActualizada
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const eliminarProducto=async (req,res)=>{
    const productoId = req.params.id;
    try{
        const producto =await Producto.findById(productoId);
        if (!producto ) {
            return res.status(404).json({
                ok: false,
                msg: 'el producto no existe por ese id'
            });
        }
        /*if(evento.user !==req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de editar este evento'
            });
        }*/

        await Producto.findByIdAndDelete(productoId);
        return res.json({
            ok: true,
            msg: "Se borro el producto"
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
    obtenerProductos,
     crearProducto,
     actualizarProducto,
     eliminarProducto
 }