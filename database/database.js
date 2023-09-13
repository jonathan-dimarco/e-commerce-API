//Importo la dependencia del ORM sequelize e inicializo una nueva instancia del mismo
const { Sequelize } = require("sequelize");

//inicializo una instancia del ORM para conectarse a la base de datos
const sequelize = new Sequelize("samyalliance", "postgres", "postgres", {
host: "localhost",
dialect: "postgres",
})

//Exporto el modulo para poder ser utilizado donde se requiera
module.exports = sequelize;