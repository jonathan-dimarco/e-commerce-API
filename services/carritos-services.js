//importo los modelos para realizar consultas a la BBDD
import { sequelize } from "../database/database.js";
import { Carrito } from "../models/carritos.js";
import { Item } from "../models/items.js";


//funciones para interactuar con la base de datos

//obtener el carrito completo
export const getCarrito = async (req, res) => {
    try {
        const { user_id } = req.params; //Deconstruyo los parametros para obtenerel id del usuario
        const carrito = await Carrito.findAll({ //metodo del ORM para realizar la query SELECT from carritos
            attributes: ["item_id", "quantity"],
            where: {
                user_id
            }
        });
        if (carrito.length === 0) { //respuesta si el carrito esta vacio
             res.status(404).json("El carrito está vacio")
        } else {
            res.status(200).json(carrito);
        }
    } catch (error) {
        // En caso de error en la consulta, maneja el error apropiadamente
        res.status(500).json({ message: error.message })
    }
}

//vaciar el carrito completamente
export const emptyCarrito = async (req, res) => {
    try {
        const { user_id } = req.params;
        const carritoActual = await Carrito.findAll({
            where: {
                user_id
            }
        });
        if (carritoActual.length - 1) {
            res.status(404).json("El carrito ya se encontraba vacio, no hay items para eliminar")
        } else {
            await Carrito.destroy({
                where: {
                    user_id
                }
            })
            res.status(204).json("El carrito fue vaciado con exito")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//agregar un item al carrito
export const addItem = async (req, res) => {
    const { user_id } = req.params;
    const { item_id, quantity } = req.body;

    // Inicio una transacción mediante el ORM a fin de mantener una persistencia de datos en la BBDD
    const transaction = await sequelize.transaction();

    try {
        // Verifico si el ítem existe y tiene suficiente stock en la tabla "items"
        const item = await Item.findByPk(item_id, { transaction });

        if (item && item.stock >= quantity) {
            // Verifico si el ítem ya existe en la tabla "carritos" para el usuario
            let itemEnCarrito = await Carrito.findOne({
                where: {
                    user_id: user_id,
                    item_id: item_id
                },
                transaction
            });

            if (itemEnCarrito) {
                // Si el ítem ya existe en el carrito, se le suma la cantidad pasada en el cuerpo de la solicitud
                itemEnCarrito.quantity += quantity;
                await itemEnCarrito.save({ transaction });
            } else {
                // Si el ítem no existe en el carrito, se crea un nuevo registro en la tabla con esa cantidad
                itemEnCarrito = await Carrito.create(
                    {
                        user_id: user_id,
                        item_id: item_id,
                        quantity: quantity
                    },
                    { transaction }
                );
            }

            // se resta la cantidad del stock en la tabla de "items"
            item.stock -= quantity;
            await item.save({ transaction });

            // Confirmo la transacción
            await transaction.commit();
            res.status(201).json({ message: 'El Item se ha agregado al carrito exitosamente' });
        } else {
            // Si el ítem no existe o no hay suficiente stock, revierto la transacción
            await transaction.rollback();
            res.status(400).json({ message: 'El ítem no está disponible o no hay suficiente stock' });
        }
    } catch (error) {
        // En caso de error en la consulta o validaciones se revierte la transacción
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};


//obtener un item especifico del carrito si existe en el mismo
export const getItem = async (req, res) => {
    const { user_id, item_id } = req.params;

    try {
        // Utilizo el método findOne del ORM para buscar una fila en la tabla "carritos"
        const itemFromCarrito = await Carrito.findOne({
            where: {
                user_id: user_id,
                item_id: item_id
            },
            attributes: ["quantity"], // Campos del carrito que deseo incluir
            include: [
                {
                    model: Item, // Modelo que deseo incluir ( tabla items)
                    as: "item", // nombre de la relación correcto
                    attributes: ["name", "price"] // Campos a incluir en la query
                }
            ]
        });

        if (itemFromCarrito) {
            // Si se encuentra el item, envio una respuesta JSON incluyendo tambien su nombre, precio y subtotal.
            res.json({
                item_id: Number(item_id),
                name: itemFromCarrito.item.name, // Accedo a las propiedaddes del item a través de la relación
                quantity: itemFromCarrito.quantity,
                price: itemFromCarrito.item.price,
                subtotal: (itemFromCarrito.quantity * itemFromCarrito.item.price)
            });
        } else {
            res.status(404).json({ message: "El item no se encuentra en el Carrito" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//quitar una cantidad especifica de elementos en el carrito
export const substractQuantity = async (req, res) => {
    const { user_id, item_id } = req.params;
    const { cantidadARestar } = req.body; // Recupero la cantidad a restar desde el cuerpo de la solicitud
    // Inicio la transaccion
    const transaction = await sequelize.transaction();

    try {
        const itemToSubstract = await Carrito.findOne({
            where: {
                user_id: user_id,
                item_id: item_id
            },
            transaction
        });

        if (itemToSubstract) {
            // Verifico si hay suficiente cantidad en el carrito antes de restar
            if (itemToSubstract.quantity >= cantidadARestar) {
                itemToSubstract.quantity -= cantidadARestar;

                // Si la cantidad después de la resta es 0, se elimina el ítem del carrito
                if (itemToSubstract.quantity === 0) {
                    await itemToSubstract.destroy({ transaction });
                } else {
                    await itemToSubstract.save({ transaction });
                }

                // Resto la cantidad del stock en la tabla de ítems
                const item = await Item.findByPk(item_id, { transaction });

                if (item) {
                    item.stock += cantidadARestar;
                    await item.save({ transaction });

                    // Confirmo la transacción
                    await transaction.commit();
                    res.status(200).json({ message: "La cantidad se ha actualizado exitosamente" });
                }
                else {
                    // Si no se encuentra el ítem, se revierte la transacción
                    await transaction.rollback();
                    res.status(404).json({ message: "El item no se encuentra en la base de datos" });
                }
            } else {
                // Si no hay suficiente cantidad en el carrito, se revierte la transacción
                await transaction.rollback();
                res.status(400).json({ message: "No hay suficiente cantidad en el carrito" });
            }
        } else {
            // Si no se encuentra el item en el carrito, devuelvo un mensaje comunicando al cliente
            res.status(404).json({ message: "El item no se encuentra en la base de datos" });
        }
    } catch (error) {
        // Revierto la transacción en caso de error
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

//quitar un item por completo del carrito
export const deleteItem = async (req, res) => {
    const { user_id, item_id } = req.params;
    //inicio de la transaccion
    const transaction = await sequelize.transaction();

    try {
        const itemToDelete = await Carrito.findOne({ //busco el item en el carrito
            where: {
                user_id: user_id,
                item_id: item_id
            },
            transaction
        });
        //si el item existe...
        if (itemToDelete) {

            //...lo busco en la tabla items para actualizar su stock
            const item = await Item.findByPk(item_id, { transaction });
            if (item) {
                item.stock += itemToDelete.quantity; //actualizo su cantidad
                await item.save({ transaction }); //confirmo el cambio en la bb.dd


                await itemToDelete.destroy({ transaction }); //elimino el item del carrito
                await transaction.commit(); //confirmo la transaccion

                res.status(204).json({ message: "El item fue removido del carrito exitosamente" });
            }
            else {
                // Si no se encuentra el ítem, se revierte la transacción
                await transaction.rollback();
                res.status(404).json({ message: "El item no se encuentra en la base de datos" });
            }

        } else {
            await transaction.rollback();
            res.status(404).json("El item no se encuentra en el carrito")
        }

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }

}

//obtener la factura
export const getInvoice = async (req, res) => {
    const { user_id } = req.params;
    
    try {
        const carrito = await Carrito.findAll({ //busco todos los items del carrito que posee el usuario 
            attributes: ["item_id", "quantity"],
            where: {
                user_id
            }
        });
        if (carrito.length - 1) { //respuesta si el carrito esta vacio
            res.status(404).json("El carrito está vacio")
        } else {
            res.status(200).json(carrito);
        }
        
    } catch (error) {
      res.status(500).json({message: error.message});  
    }

}





