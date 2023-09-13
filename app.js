//Requiero los paquetes y dependencias que voy a utilizar
const express = require("express");
const bodyParser = require("body-parser");

//Inicio una nueva instancia del framework Express para utilizar con la const "app"
const app = express();

//Seteo el middleware  para manejar las req y res en formato Json
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.use(bodyParser.json());

//simple mensaje al hacer un get en la url root de la app (localhost:5000/) para testear que esta corriendo correctamente
app.get('/', (req, res) => {
    try {
    res.status(200).send("Carrito de Compras de Samy Alliance");
    } catch(err) {
        res.send(err);
    }
})

//Seteo el puerto y la respuesta al iniciarlo
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
