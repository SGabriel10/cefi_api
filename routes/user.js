const {check}= require('express-validator')
const {validarCampos} = require("../middlewares/validar-campos");
const {Router}= require('express');
const router= Router();
const {crearUsuario,logearUsuario,renovarUsuario,obtenerUsuarios,eliminarUsuario, actualizarUsuario}= require("../controllers/user")
const {validarJWT} = require('../middlewares/validar-jwt');
router.get('/',obtenerUsuarios);
router.post('/',
    [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe ser de 6 caracteres ').isLength({min: 6})],validarCampos, logearUsuario)

router.post('/new',
    [check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres ').isLength({min: 6})],validarCampos,
    crearUsuario)
router.get('/renew',validarJWT,renovarUsuario)
router.put('/:id',actualizarUsuario)
router.delete('/:id',eliminarUsuario)
module.exports= router