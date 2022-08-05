const mongoose = require('mongoose');

const dbConecction = async () => {


    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log("DB ONLINE");

    } catch (error) {
        console.log(error);
        throw new error('error conexion bd');
    }





}

module.exports = {
    dbConecction
}