//importo la funcion Router para manejar mis endpoints
import { Router } from "express";
const router = Router();
//importo los servicios para realizar las funciones requeridas en cada ruta
import { addItem, deleteItem, emptyCarrito, getCarrito, getInvoice, getItem, substractQuantity } from "../services/carritos-services.js"

//obtener el carrito completo de un usuario
router.get("/api/carrito/:user_id", getCarrito);

//vaciar el carrito de un usuario
router.delete("/api/carrito/:user_id", emptyCarrito);

//añadir un item al carrito
router.post("/api/carrito/:user_id/items", addItem);

// obtener un item especifico del carrito (si existe en el mismo) de un usuario especifico 
router.get("/api/carrito/:user_id/items/:item_id", getItem);

//restar items del carrito
router.put("/api/carrito/:user_id/items/:item_id", substractQuantity)

//eliminar item del carrito
router.delete("/api/carrito/:user_id/items/:item_id", deleteItem)

//obtener factura del carrito con todos los datos requeridos
router.get("/api/carrito/:user_id/invoice", getInvoice)






export default router;


