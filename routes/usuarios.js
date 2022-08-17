const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut } = require('../controllers/usuarios');
const { esRolValido, validaEmail, existeUsuarioById } = require('../helpers/db-validators');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

//OPTIMIZACION DE IMPORTACIONES
const { validarCampos, validarJWT, esAdminRole ,tieneRole} = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo tiene formato incorrecto').isEmail(),
    // check('rol', 'El rol no es valido').isIn('Admin','Operador'),
    // check('rol').custom((rol) => esRolValido(rol)),
    //Si solo se pasa 1 parametro no es necesario enviarlo explicitamente
    //Por defecto la funcion esRolValido toma el argumento que emite el check
    check('correo').custom(validaEmail),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('OPERADOR', 'COORDINADOR'),
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuariosDelete);

module.exports = router;
