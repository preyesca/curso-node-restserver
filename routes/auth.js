const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('password','Contraseña obligatoria').not().isEmpty(),
    check('correo','Correo Obligatorio').isEmail(),
    validarCampos
],login);

module.exports = router;