const {check}= require('express-validator')
const {Router}= require('express');
const router= Router();
const {obtenerDetalles, crearDetalle, actualizarDetalle, eliminarDetalle}= require("../controllers/saleDetail")

router.get('/',obtenerDetalles);
router.post('/new',
    [check('descripcion', 'La descripcion es obligatorio').not().isEmpty()], crearDetalle)
router.put('/:id',actualizarDetalle);
router.delete('/:id',eliminarDetalle);
module.exports= router