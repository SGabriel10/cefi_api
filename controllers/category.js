const Categoria = require('../models/Categoria');


const obtenerCategorias= async(req,res)=>{
    let categorias= await Categoria.find();
    return res.json({
        ok: true,
        categorias
    });
}


const crearCategoria=async (req,res)=>{
    const {descripcion}=req.body
    let categoria = await Categoria.findOne({descripcion: descripcion});
    if (categoria){
        return res.status(400).json({
            ok: false,
            msg: 'La categoria ya existe'
        })
    }
    try{

        categoria = new Categoria(req.body);

        await categoria.save();
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



const actualizarCategoria=async(req,res)=>{
    const categoriaId = req.params.id;
    try{
        const categoria =await Categoria.findById(categoriaId);
        if (!categoria ) {
            return res.status(404).json({
                ok: false,
                msg: 'La categoria no existe por ese id'
            });
        }

        const nuevaCategoria = req.body

        const categoriaActualizada = await Categoria.findByIdAndUpdate(categoriaId,nuevaCategoria, {new:true});
        return res.json({
            ok: true,
            categoria: categoriaActualizada
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const eliminarCategoria=async (req,res)=>{
    const categoriaId = req.params.id;
    try{
        const categoria =await Categoria.findById(categoriaId);
        if (!categoria ) {
            return res.status(404).json({
                ok: false,
                msg: 'la categoria no existe por ese id'
            });
        }
        /*if(evento.user !==req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de editar este evento'
            });
        }*/

        await Categoria.findByIdAndDelete(categoriaId);
        return res.json({
            ok: true,
            msg: "Se borro la categoria"
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
    crearCategoria,obtenerCategorias,eliminarCategoria, actualizarCategoria
}