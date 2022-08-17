const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay Token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en bd'
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario estado false'
            });
        }

        //GUARDANDO EN LA REQUEST EL UID
        //REQUEST PASA POR REFERENCIA
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}

