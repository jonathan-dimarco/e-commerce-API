import express from "express";

import { sequelize } from "./database.js";
import { Item } from "../models/items.js"
import { User } from "../models/users.js"
import { Carrito } from "../models/carritos.js"
import { usuarios, items, carritos } from "./data.js";

export const app = express();

const seed = async () => {
await sequelize.sync({force: true}).then(async () => {
    for (const usuario of usuarios) {
      await User.create(usuario);
    }

    for (const item of items) {
      await Item.create(item);
    }
    for (const carrito of carritos) {
      await Carrito.create(carrito);
    }
    console.log('Base de datos poblada con éxito');
  })
    .catch((error) => {
      console.error('Error al poblar la base de datos:', error);
    });
}

seed()

export default app;