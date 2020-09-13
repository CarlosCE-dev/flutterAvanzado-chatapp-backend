const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');

const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {

    console.log('Cliente conectado');
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] );

    // Verificar autenticacion
    if ( !valido ) return client.disconnect(); 

    usuarioConectado( uid );

    // Ingregar al usuario a una sala en particular
    client.join( uid );

    client.on('mensaje-personal', async ( payload ) => {
        await grabarMensaje( payload );
        io.to( payload.para ).emit('mensaje-personal', payload );
    });

    client.on('disconnect', () => {
        usuarioDesconectado( uid );
    });

});
