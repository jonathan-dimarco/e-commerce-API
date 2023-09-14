//importo el modelo para realizar consultas
import { Carrito } from "../models/carritos.js"

//funciones para interactuar con la base de datos

//obtener el carrito completo
export const getCarrito = async (req, res) => {
    try {
        const { user_id } = req.params;
        const carrito = await Carrito.findAll({
            where: {
                user_id
            }
        });
        res.status(200).json(carrito);
    } catch (error) {
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

//obtener un item especifico del carrito si existe en el mismo
