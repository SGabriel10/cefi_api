const {check}= require('express-validator')
const {validarCampos} = require("../middlewares/validar-campos");
const {Router}= require('express');
const router= Router();
const {logearUsuario,renovarUsuario}= require("../controllers/auth")
const {validarJWT} = require('../middlewares/validar-jwt');

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres ').isLength({min: 6})],validarCampos, logearUsuario)


router.get('/renew',validarJWT,renovarUsuario)

module.exports= router