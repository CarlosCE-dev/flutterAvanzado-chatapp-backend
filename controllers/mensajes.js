const { response } = require("express");

const Mensaje = require('../models/mensaje');

const getChat = async ( req, res = response ) => {
    try {
        
        const miId = req.uid;
        const mensajeDe = req.params.de;
    
        const lastMensajes = await Mensaje.find({
            $or: [{ de: miId, para: mensajeDe }, { de: mensajeDe, para: miId }]
        })
        .sort({ createdAt: 'desc' })
        .limit( 30 );
    
        res.json({
            ok: true,
            data: lastMensajes
        })
    } catch (error) {
        console.log(error);
        
    }

}

module.exports = {
    getChat
}