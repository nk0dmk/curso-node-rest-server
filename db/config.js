const mongoose = require('mongoose');


const dbConn = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });

        console.log('Conectados a Mongo Atlas DB');

    } catch (err) {
        console.log(err);
        throw new Error('Error al conectar a la Base de Datos.');
    }
}


module.exports = {
    dbConn,
}