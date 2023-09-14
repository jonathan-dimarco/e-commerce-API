import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Item } from "./items.js";
import { User } from './users.js';

/*Defino el modelo para la tabla "carritos" utilizando el metodo define del ORM sequelize, 
para luego implementarlos en la BB.DD*/
export const Carrito = sequelize.define('carritos', {
user_id: {
    type: DataTypes.INTEGER
},
item_id: {
    type: DataTypes.INTEGER
},
quantity: {
    type: DataTypes.INTEGER
},
subtotal: {
    type: DataTypes.INTEGER
}
})
Carrito.removeAttribute("id");

//Defino las relaciones entre tablas utilizando los metodos que me provee el ORM

Carrito.belongsTo(User, {
    foreignKey: "user_id",
    sourceKey:"id"
})

User.hasMany(Carrito, {
    foreignKey: "user_id",
    targetId:"id"
})

Carrito.belongsTo(Item, {
    foreignKey: "item_id",
    sourceKey:"id"
})

Item.hasMany(Carrito, {
    foreignKey: "item_id",
    targetId:"id"
})

