const Cliente = require('../models/Cliente');


const obtenerClientes= async(req,res)=>{
    let clientes= await Cliente.find();
    return res.json({
        ok: true,
        clientes
    });
}


const crearCliente=async (req,res)=>{
    const {name}=req.body
    let cliente = await Cliente.findOne({name: name});
    if (cliente){
        return res.status(400).json({
            ok: false,
            msg: 'El Cliente ya existe'
        })
    }
    try{

        cliente = new Cliente(req.body);

        await cliente.save();
        return res.status(201).json({
            "ok": true,
            msg: "nuevo cliente"
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



const actualizarCliente=async(req,res)=>{
    const clienteId = req.params.id;
    try{
        const cliente =await Cliente.findById(clienteId);
        if (!cliente ) {
            return res.status(404).json({
                ok: false,
                msg: 'El cliente no existe por ese id'
            });
        }

        const nuevoCliente = req.body

        const clienteActualizado = await Cliente.findByIdAndUpdate(clienteId,nuevoCliente, {new:true});
        return res.json({
            ok: true,
            cliente: clienteActualizado
        });
    }catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const eliminarCliente=async (req,res)=>{
    const clienteId = req.params.id;
    try{
        const cliente =await Cliente.findById(clienteId);
        if (!cliente ) {
            return res.status(404).json({
                ok: false,
                msg: 'El cliente no existe por ese id'
            });
        }

        await Cliente.findByIdAndDelete(clienteId);
        return res.json({
            ok: true,
            msg: "Se borro el cliente"
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
    crearCliente,obtenerClientes,eliminarCliente, actualizarCliente
}