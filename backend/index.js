const app = require('./app');
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
  const PORT = process.env.PORT || 3001 
    //iniciamos nuestro servidor
    await app.listen(PORT);
    console.log('server listen port' + PORT)
}

main();