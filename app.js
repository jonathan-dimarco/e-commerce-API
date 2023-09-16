//Requiero los paquetes, dependencias, middleware y modelos que voy a utilizar
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./database/database.js";
import { Item } from "./models/items.js"
import { User } from "./models/users.js"
import { Carrito } from "./models/carritos.js"
import { usuarios, items, carritos } from "./database/data.js";
import carritosRoutes from "./routes/carritos-routes.js"
//Inicio una nueva instancia del framework Express para utilizar con la const "app"
export const app = express();

//Seteo el middleware  para manejar las req y res en formato Json
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Indico a la app que utilice los routers

app.use(carritosRoutes);

/*Seteo el puerto y la respuesta al iniciarlo, incluyo un metodo del ORM SEQUELIZE para
testear que la conexión a la base de datos es correcta y el metodo "sync" para sincronizarla*/
const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida exitosamente');
    //codigo para sincronizar, crear tablas y poblar datos en la base de datos
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`App disponible en el puerto: ${PORT}`);
    });
  } catch (error) {
    console.log('No se pudo conectar a la base de datos', error);
  }
}

main();

export default app;
