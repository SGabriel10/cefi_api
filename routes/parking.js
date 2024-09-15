const {check}= require('express-validator')
const {Router}= require('express');
const router= Router();
const {crearCar,obtenerCar, actualizarCar}= require("../controllers/parking")
router.get('/',obtenerCar);

router.post('/new',crearCar)
router.put('/:id',actualizarCar);
module.exports= router