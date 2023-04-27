const {check}= require('express-validator')
const {Router}= require('express');
const router= Router();
const {crearCliente,obtenerClientes, actualizarCliente, eliminarCliente}= require("../controllers/client")
router.get('/',obtenerClientes);

router.post('/new',
    [check('name', 'La descripcion es obligatorio').not().isEmpty()], crearCliente)
router.put('/:id',actualizarCliente);
router.delete('/:id',eliminarCliente);
module.exports= router