//importo la funcion Router para manejar mis endpoints
import { Router } from "express";
const router = Router();
//importo los servicios para realizar las funciones requeridas en cada ruta
import { emptyCarrito, getCarrito } from "../services/carritos-services.js"

//obtener el carrito completo de un usuario
router.get("/api/carrito/:user_id", getCarrito);

//vaciar el carrito de un usuario
router.delete("/api/carrito/:user_id", emptyCarrito);

// //api/carrito/:user_id/:item_id
// router.get()
// router.put()
// router.delete()

// //api/carrito/:user_id/invoice
// router.get()






export default router;


