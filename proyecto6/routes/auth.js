// importamos express
import express from "express";
import { USERS_BBDD } from "../bbdd.js";
import checkEmailPassword from "../utils/check_email_password.js";

const authRouter = express.Router();

// Endpoint público (no autenticado y no autorizado)
authRouter.get("/public", (req, res) => res.sendStatus("Endpoint público"));

// Endpoint autenticado para todo usuario registrado
authRouter.post("/autenticado", (req, res) => {
    // Obtenemos el email y password del body
    const { email, password } = req.body;
    // Si no existe alguno de esos dos campos devolvemos y 400(bad request)
    if (!email || !password) return res.sendStatus(400);
    /*
    // Buscamos el email entre las cuentas
    const user = USERS_BBDD.find(user => user.email === email);
    // Si el usuario no existe enviamos un 401 (unauthorized)
    if (!user) return res.send(401);
    // Si la password es distinta a la recibida por el body enviamos también un 401 (unauthorized)
    if (user.password !== password) return res.send(401);
    */
    try {
        // Llamamos a la función de validar el email y password
        const user = checkEmailPassword(email, password);
        //Si todo es correcto enviamos la respuesta. 200 OK
        return res.send(`Usuario ${user.name} autenticado`)
    } catch (err) {
        // Si el usuario no existe enviamos un 401 (unauthorized)
        return res.sendStatus(401);
    }
});

// Endpoint autorizado a administradores
authRouter.post("/autorizado", (req, res) => {
    // Obtenemos el email y password del body
    const { email, password } = req.body;
    // Si no existe alguno de esos dos campos devolvemos y 400(bad request)
    if (!email || !password) return res.sendStatus(400);

    /*
    // Buscamos el email entre las cuentas
    const user = USERS_BBDD.find(user => user.email === email);
    // Si el usuario no existe enviamos un 401 (unauthorized)
    if (!user) return res.send(401);
    // Si la password es distinta a la recibida por el body enviamos también un 401 (unauthorized)
    if (user.password !== password) return res.send(401);
    */
    try {
        // Llamamos a la función de validar el email y password
        const user = checkEmailPassword(email, password);
        // Si el rol del usuario no es administrador devolvemos un 403 (Forbidden)
        if (user.role !== 'admin') return res.sendStatus(403)
        //Si todo es correcto enviamos la respuesta. 200 OK
        return res.send(`Usuario administrador ${user.name}`);
    } catch (err) {
        // Si el usuario no existe enviamos un 401 (unauthorized)
        return res.sendStatus(401);
    }
});

export default authRouter;