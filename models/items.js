import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

/*Defino el modelo para la tabla items utilizando el metodo define del ORM sequelize, 
para luego implementarlos en la BB.DD*/
export const Item = sequelize.define('items', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
name: {
    type: DataTypes.STRING
},
product_type: {
    type: DataTypes.STRING
},
description: {
    type: DataTypes.STRING
},
price: {
    type: DataTypes.INTEGER
},
stock: {
    type: DataTypes.INTEGER
}
})
