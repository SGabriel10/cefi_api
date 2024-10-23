const {check}= require('express-validator')
const {Router}= require('express');
const router= Router();
const {crearCabecera,obtenerCabecera, actualizarCabecera, eliminarCabecera}= require("../controllers/header")
router.get('/',obtenerCabecera);

router.post('/new',
    [check('nombre', 'La descripcion es obligatorio').not().isEmpty()], crearCabecera);
router.put('/:id',actualizarCabecera);
router.delete('/:id',eliminarCabecera);
module.exports= router