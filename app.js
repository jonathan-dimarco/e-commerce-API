//Requiero los paquetes, dependencias, middleware y modelos que voy a utilizar
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./database/database.js";
import "./models/items.js"
import "./models/users.js"
import "./models/carritos.js"
//Inicio una nueva instancia del framework Express para utilizar con la const "app"
const app = express();

//Seteo el middleware  para manejar las req y res en formato Json
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.use(bodyParser.json());

/*Seteo el puerto y la respuesta al iniciarlo, incluyo un metodo del ORM SEQUELIZE para
testear que la conexión a la base de datos es correcta y el metodo "sync" para sincronizarla*/
const PORT = process.env.PORT || 5000;

async function main() {try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await sequelize.sync({force: true});
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
} catch (error) {
  console.error('Unable to connect to the database:', error);
}}

main();

/*simple mensaje al hacer una peticion GET en la url root de la app (localhost:5000/) para testear 
que esta corriendo correctamente*/
app.get('/', (req, res) =>
    {
      res.status(200).send("Carrito de Compras de Samy Alliance");
  }
  )

export default app;
