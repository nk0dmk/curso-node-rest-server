const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async( role = '' )  => {

    const existsRole = await Role.findOne( { role } );
    if( !existsRole ) {
        throw new Error (`El rol ${ role }, no existe en la DB. `);
    } 
}

const userExistInDB = async( id )  => {
    // OJO -> a findByID hay q pasarle el id en string no en objeto {}
    const existsID = await User.findById( id );
    if( !existsID ) {
        throw new Error (`El ID ${ id }, no existe en la DB. `);
    } 
}

const emailExistsInDB = async( mail = '' ) => {
    
    const existsEmail = await User.findOne( { mail } );
    if( existsEmail ) {
        throw new Error (`El email ${ mail }, ya está en registrado.`);
    }
}

module.exports = {
    isValidRole,
    emailExistsInDB,
    userExistInDB,
}