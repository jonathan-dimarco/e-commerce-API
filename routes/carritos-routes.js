//importo la funcion Router para manejar mis endpoints
import { Router } from "express";
const router = Router();
//importo los servicios para realizar las funciones requeridas en cada ruta
import { emptyCarrito, getCarrito, getItemFromCarrito, substractQuantity } from "../services/carritos-services.js"

//obtener el carrito completo de un usuario
router.get("/api/carrito/:user_id", getCarrito);

//vaciar el carrito de un usuario
router.delete("/api/carrito/:user_id", emptyCarrito);

// obtener un item especifico del carrito (si existe en el mismo) de un usuario especifico 
router.get("/api/carrito/:user_id/items/:item_id", getItemFromCarrito);

//router.post()

//restar items del carrito
router.put("/api/carrito/:user_id/items/:item_id", substractQuantity)

// router.delete()

// //api/carrito/:user_id/invoice
// router.get()






export default router;


