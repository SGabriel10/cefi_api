const {check}= require('express-validator')
const {Router}= require('express');
const router= Router();
const {crearVenta,obtenerVentas, actualizarVenta, eliminarVenta}= require("../controllers/sale")

router.get('/',obtenerVentas);
router.post('/new',
    [check('descripcion', 'La descripcion es obligatorio').not().isEmpty()], crearVenta)
router.put('/:id',actualizarVenta);
router.delete('/:id',eliminarVenta);
module.exports= router