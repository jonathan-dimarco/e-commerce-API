//datos para poblar las tablas en postgresql

export const usuarios = [
    { email: "admin@email.com", password: "admin" },
    { email: "usuario2@email.com", password: "1234" },
    { email: "usuario3@email.com", password: "1234" },
    { email: "usurio4@email.com", password: "1234" },
];
export const items = [
    { name: "Gafas de sol Carey", product_type: "Producto", description: "Gafas de sol color negro", price: 39.99, stock: 38 },
    { name: "Camiseta basica", product_type: "Producto", description: "camiseta de algodon color blanco", price: 15.50, stock: 100 },
    { name: "Red Hot Chili Peppers en Madrid", product_type: "Evento", description: "Entrada general", price: 60, stock: 50 },
    { name: "Arctic Monkeys en Wizink Center", product_type: "Evento", description: "Entrada general", price: 75, stock: 90 },
    { name: "GP Formula 1 Barcelona", product_type: "Evento", description: "Entrada paddock", price: 299.99, stock: 5 },
    { name: "Sudadera Scuderia Ferrari", product_type: "Producto", description: "sudadera color rojo del equipo F1 Ferrari", price: 49.99, stock: 43 },
];

export const carritos = [
    {user_id: 1, item_id: 1, quantity: 1},
    {user_id: 1, item_id: 2, quantity: 4},
    {user_id: 1, item_id: 4, quantity: 2},
    {user_id: 2, item_id: 5, quantity: 5},
    {user_id: 2, item_id: 6, quantity: 5},
]