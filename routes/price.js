const {check}= require('express-validator')
const {Router}= require('express');
const router= Router();
const {crearPrecio,obtenerPrecios, actualizarPrecio, eliminarPrecio}= require("../controllers/price")
router.get('/',obtenerPrecios);

router.post('/new',
    [check('descripcion', 'La descripcion es obligatorio').not().isEmpty()], crearPrecio)
router.put('/:id',actualizarPrecio);
router.delete('/:id',eliminarPrecio);
module.exports= router