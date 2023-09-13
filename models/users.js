import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

/*Defino el modelo para la tabla "users" utilizando el metodo define del ORM sequelize, 
para luego implementarlos en la BB.DD*/
export const User = sequelize.define('users', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
email: {
    type: DataTypes.STRING,
    unique: true
},
password: {
    type: DataTypes.STRING
},
first_name: {
    type: DataTypes.STRING
},
last_name: {
    type: DataTypes.STRING
}
})