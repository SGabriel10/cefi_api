const {check}= require('express-validator')
const {Router}= require('express');
const router= Router();
const {crearCategoria,obtenerCategorias,eliminarCategoria, actualizarCategoria}= require("../controllers/category")
router.get('/',obtenerCategorias);

router.post('/new',
    [check('descripcion', 'La descripcion es obligatorio').not().isEmpty()], crearCategoria)
router.put('/:id',actualizarCategoria)
router.delete('/:id',eliminarCategoria)
module.exports= router