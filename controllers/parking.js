const Parking = require('../models/Parking');


const obtenerCar= async(req,res)=>{
    let carros= await Parking.find();
    return res.json({
        ok: true,
        carros
    });
}


const crearCar=async (req,res)=>{
    const {nro_chapa}=req.body
    let car = await Parking.findOne({nro_chapa: nro_chapa});
    if (car){
        return res.status(400).json({
            ok: false,
            msg: 'El carro ya existe'
        })
    }
    try{

        carro = new Parking(req.body);
        await carro.save();
        return res.status(201).json({
            "ok": true,
            msg: "nuevo car"
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



const actualizarCar=async(req,res)=>{
    const carId = req.params.id;
    try{
        const car =await Parking.findById(carId);
        if (!car ) {
            return res.status(404).json({
                ok: false,
                msg: 'El car no existe por ese id'
            });
        }

        const nuevoCar = req.body

        const carActualizado = await Parking.findByIdAndUpdate(carId,nuevoCar, {new:true});
        return res.json({
            ok: true,
            car: carActualizado
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
    crearCar,obtenerCar, actualizarCar
}