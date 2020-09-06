/* -------------------------------------------------------------------------- */
/*                               path: api/login                              */
/* -------------------------------------------------------------------------- */
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Controllers
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es requerida').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
] , crearUsuario );

router.post('/', [
    check('password','La contraseña es requerida').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
] , loginUsuario );

router.get('/renew', validarJWT, renewToken );

module.exports = router;