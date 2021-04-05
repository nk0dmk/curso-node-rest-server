const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    mail: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    pwd: {
        type: String,
        required: [true, 'El contraseña es obligatoria']
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALE_ROLE']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
});


UserSchema.methods.toJSON = function() {
    // sacamos la version y el password del JSON
    const { __v, pwd, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);