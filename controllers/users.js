//const { response } = require('express');
//const res = response;
const User = require('../models/user');
const crypt = require('bcryptjs');

const whitelist =  ['http://example1.com', 'http://example2.com'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

const getUsers = async(req, res) => {

    const { limit = 5, from = 0 } = req.query;
    // filtramos la query
    const filter = { status: true};
    /**
     * Convertimos los await a una promesa de await-> se ejecutan en paralelo
     * NO una a una con los tiempos de espera q eso conlleva.
     * 
     * const users = await User.find( filter )
     *    .skip( Number( from ) )
     *    .limit( Number( limit ) );
     *
     * const totalUsers = await User.countDocuments( filter );
     * 
     * res.status(200).json({
     *   msg: 'get API - Controller - Peticion de Usuario(s)',
     *   totalUsers,
     *   users
     * });
     */
    
    const [ total, users ] = await Promise.all([
        User.countDocuments( filter ),
        User.find( filter )
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ]);

    res.status(200).json({
        msg: 'get API - Controller - Peticion de Usuario(s)',
        total,
        users
    });
};

const postUsers = async (req, res )  => {

    // Parametrizar lo necesario y el resto serializarlo
    //const {name, ...params} = req.body
    const { name, mail, pwd, role } = req.body;
    const user = new User( { name, mail, pwd, role } );

    //verificar si el mail existe
    /*const emailExists = await User.findOne({mail});
    if( emailExists ){
        return res.status(400).json({
            msg: 'El correo '+ mail + ' ya está registrado'
        });
    }*/
    //encriptar la pass
    const salt = crypt.genSaltSync();
    user.pwd = crypt.hashSync( pwd, salt);

    //guardar en db
    await user.save();

    res.status(200).json({
        msg: 'post API - Controller - Usuario Creado con exito',
        user
    });
}

const putUsers = async(req, res) => {
    // recojemos el id desde el router
    const { id } = req.params;
    const { _id, pwd, google, mail, ...userReq } = req.body;

    // TODO validar contra DB

    if( pwd ) {
        const salt = crypt.genSaltSync();
        userReq.pwd = crypt.hashSync( pwd, salt);
    }
    
    const user = await User.findByIdAndUpdate( id, userReq );
    res.status(202).json({
        msg: 'put API - Controller - Usuario Actualizado con exito',
        user
    });
}

const patchUsers = (req, res) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

const deleteUsers = async(req, res) => {
    const { id } = req.params;

    // Borrarlo fisicamente
    //const user = await User.findByIdAndDelete( id );

    // Marcarlo como inactivo o borrado
    const user = await User.findByIdAndUpdate( id, { status: false } );
    res.status(202).json({
        msg: 'delete API - Controller - Usuario Eliminado con exito',
        user
    });
}


module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    patchUsers
}