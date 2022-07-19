const { response } = require('express');

const usuariosGet = (req, res = response) => {

    res.json({
        msg: 'get api - controlador'
    })

}

const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post api - controlador',
        body
    })
}

const usuariosPut = (req, res = response) => {
    res.json({
        msg: 'put api - controlador'
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete api - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}