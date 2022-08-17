
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    img: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//sobreEscribir el metodo toJson para quitar del Modelo el __v y password 
//en la response

UsuarioSchema.methods.toJSON = function () {

    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;

}

//"Usuario" Se coloca en singular, y en la bd se creara en plural "Usuarios"
module.exports = model('Usuario', UsuarioSchema);