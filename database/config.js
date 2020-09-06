const moongoose = require('mongoose');

 const dbConnection = async () => {
    try {
        await moongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB ONLINE');
        

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos');
    }
 }

 module.exports = { dbConnection }