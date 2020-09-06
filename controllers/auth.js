const { response } = require("express");
const bcrypt = require('bcryptjs');
// Models
const Usuario = require('../models/usuarios');
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async ( req, res = response ) => {

    try {
        
        const { email, password } = req.body;
        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            msg: 'Crear usuario',
            data: usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const loginUsuario = async ( req, res = response ) => {

    try {
        
        const { email, password } = req.body;

        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'Password no es valida'
            });
        }

        // Generar el JWT TOKEN
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            msg: 'Login usuario',
            data: usuarioDB,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const renewToken = async ( req, res = response ) => {
    try {
        
        const { uid } = req;
        const usuario = await Usuario.findById( uid );

        // Generar el JWT TOKEN
        const token = await generarJWT( uid );

        res.json({
            ok: true,
            msg: 'Renew token',
            data: usuario,
            token,
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
    crearUsuario,
    loginUsuario,
    renewToken
}