const app = require('./src/app');
const sequelize = require('./src/DB/database')


const main = async()=>{
    //testeamos si la DB fue conectada
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({force: false})
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    //iniciamos nuestro servidor
    await app.listen(app.get('port'));
    console.log('server listen port', app.get('port'))
}

main();