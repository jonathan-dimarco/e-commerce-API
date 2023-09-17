//Requiero los modulos para test
import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { app } from "../app.js"; // Requiero la app para testearla


chai.use(chaiHttp);


describe("Ruta que devuelve el carrito de un usuario (/carrito/:user_id)", () => {
    it("Debería devolver un objeto JSON con código de estado 200 cuando el carrito tiene elementos", async () => {
        const userId = 1;

        const res = await chai
            .request(app)
            .get(`/carrito/${userId}`);

        expect(res).to.have.status(200);
        expect(res).to.have.header("content-type", "application/json; charset=utf-8");
        expect(res.body).to.be.an("array"); // El carrito debería ser un array de elementos
    });

    it('Debería devolver una respuesta 404 cuando el carrito está vacío', async () => {
        const userId = -1;

        const res = await chai
            .request(app)
            .get(`/carrito/${userId}`);

        expect(res).to.have.status(404);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
    });

    it('Debería devolver una respuesta 500 si hay un error interno', async () => {
        const userId = "asdw";

        const res = await chai
            .request(app)
            .get(`/carrito/${userId}`);

        expect(res).to.have.status(500);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
    });
});

describe("Ruta para añadir un item al carrito (/carrito/:user_id/items)", () => {

    it("Deberia devolver una respuesta 201 si se añade exitosamente", async () => {
        const userId = 1;
        const requestBody = {
            item_id: 1,
            quantity: 1
        };
        const res = await chai
            .request(app)
            .post(`/carrito/${userId}/items`)
            .send(requestBody)

        expect(res).to.have.status(201);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
    })

    it("Debería devolver una respuesta 400 cuando no hay suficiente stock", async () => {
        const userId = 1;
        const requestBody = {
            item_id: 2,
            quantity: 100000 // Una cantidad mayor que el stock disponible
        };

        const res = await chai
            .request(app)
            .post(`/carrito/${userId}/items`)
            .send(requestBody);

        expect(res).to.have.status(400);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');

    });


});

describe("obtener un item especifico del carrito (si existe en el mismo) de un usuario especifico (/carrito/:user_id/items/:item_id)", () => {
    it("devolver un status 200 si se encuentra el item", async () => {
        const userId = 1
        const itemId = 1

        const res = await chai
            .request(app)
            .get(`/carrito/${userId}/items/${itemId}`)

        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');

    })

    it("devolver un status 404 si no se encuentra el item", async () => {
        const userId = 1
        const itemId = -1

        const res = await chai
            .request(app)
            .get(`/carrito/${userId}/items/${itemId}`)

        expect(res).to.have.status(404);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');

    })
})

describe("Restar items del carrito (/carrito/:user_id/items/:item_id)", () => {
    it("devolver una respuesta 200 si se actualiza la cantidad correctamente", async () => {
        const userId = 1
        const itemId = 1

        const requestBody = {
            cantidadARestar: 1
        };

        const res = await chai
            .request(app)
            .put(`/carrito/${userId}/items/${itemId}`)
            .send(requestBody);

        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');

    })
    it("devolver una respuesta 404 si el item no se encuentra", async () => {
        const userId = 1
        const itemId = -1

        const requestBody = {
            cantidadARestar: 1
        };

        const res = await chai
            .request(app)
            .put(`/carrito/${userId}/items/${itemId}`)
            .send(requestBody);

        expect(res).to.have.status(404);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');

    })
})

describe("Ruta para obtener la factura(/carrito/:user_id/invoice)", () => {
    it("Devolver una respuesta 200 cuando se obtiene la factura", async () => {
        const userId = 1;

        const res = await chai
            .request(app)
            .get(`/carrito/${userId}/invoice`)

        expect(res).to.have.status(200);

    })

    it("Devolver una respuesta 400 cuando el carrito esta vacio", async () => {
        const userId = 10;

        const res = await chai
            .request(app)
            .get(`/carrito/${userId}/invoice`)

        expect(res).to.have.status(400);
    })
})
