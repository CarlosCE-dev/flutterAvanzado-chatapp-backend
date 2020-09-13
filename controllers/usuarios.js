const { response } = require("express");
const Usuario = require('../models/usuarios');

const getUsuarios = async ( req, res = response ) => {
    try {
        
        const desde = Number( req.query.desde ) || 0;

        const { uid } = req;
        const usuarios = await Usuario
            .find({ _id: { $ne: uid } })
            .sort('-online')
            .skip(desde)
            .limit(20)
            

        res.json({
            ok: true,
            msg: 'Get usuarios',
            data: usuarios,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getUsuarios
}