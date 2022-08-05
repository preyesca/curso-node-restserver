const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta en la BD`)
    }
}

const validaEmail = async (email = '') => {
    const existeEmail = await usuario.findOne({ correo: email });
    if (existeEmail) {
        throw new Error(`El correo ${email} ya existe en la BD`)
    }
}

const existeUsuarioById = async (id) => {
    const existeUsuario = await usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario con Id :${id} no existe en la BD`)
    }
}


module.exports = {
    esRolValido,
    validaEmail,
    existeUsuarioById
}