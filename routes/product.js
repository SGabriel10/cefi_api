const {check}= require('express-validator')
const {Router}= require('express');
const router= Router();
const {crearProducto,obtenerProductos, actualizarProducto, eliminarProducto}= require("../controllers/product")
router.get('/',obtenerProductos);

router.post('/new',
    [check('descripcion', 'La descripcion es obligatorio').not().isEmpty()], crearProducto)
router.put('/:id',actualizarProducto);
router.delete('/:id',eliminarProducto);
module.exports= router