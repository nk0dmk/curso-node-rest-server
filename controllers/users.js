//const { response } = require('express');
//const res = response;
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

const getUsers = (req, res) => {
    
    const params = req.query;

    res.status(200).json({
        msg: 'get API - Controller',
        params
    });
};

const postUsers = (req, res)  => {

    const {name, age} = req.body;
    res.json({
        msg: 'post API - Controller',
        name,
        age
    });
}

const putUsers = (req, res) => {
    // recojemos el id desde el router
    const { id } = req.params;
    
    res.json({
        msg: 'put API - Controller',
        id
    });
}

const patchUsers = (req, res) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

const deleteUsers = (req, res) => {
    res.json({
        msg: 'delete API - Controller'
    });
}


module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    patchUsers
}