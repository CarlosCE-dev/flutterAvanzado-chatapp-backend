/* -------------------------------------------------------------------------- */
/*                             path: api/mensajes                             */
/* -------------------------------------------------------------------------- */
const { Router } = require('express');

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');

// Controllers
const { getChat } = require('../controllers/mensajes');

const router = Router();

router.get('/:de', validarJWT, getChat );

module.exports = router;