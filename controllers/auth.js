
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
        const token = await generarJWT(usuario.id)

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

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {

            const data = {
                nombre,
                correo,
                google: true,
                password: ':D',
                rol:'ADMIN'
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
    }


}

module.exports = {
    login, googleSignIn
}