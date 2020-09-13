/* -------------------------------------------------------------------------- */
/*                             path: api/usuarios                             */
/* -------------------------------------------------------------------------- */
const { Router } = require('express');

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

// Controllers
const { getUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', validarJWT, getUsuarios );

module.exports = router;