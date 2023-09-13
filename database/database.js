//Importo la dependencia del ORM sequelize e inicializo una nueva instancia del mismo
import { Sequelize } from "sequelize";

/*inicializo una instancia del ORM para conectarse a la base de datos y 
exporto el modulo para poder ser utilizado donde se requiera*/
export const sequelize = new Sequelize("samyalliance", "postgres", "postgres", {
host: "localhost",
dialect: "postgres",
})

