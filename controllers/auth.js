
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        //Verificar si email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.json({
                msg: 'Correo o Password Invalido - Correo'
            });
        }
        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.json({
                msg: 'Usuario o Password Incorrecto - Estado'
            });
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.json({
                msg: 'Usuario o Password Incorrecto - password'
            });
        }

        //Generar el JWT
        const token= await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error consulte con el admin'
        })
    }

}

module.exports = {
    login
}