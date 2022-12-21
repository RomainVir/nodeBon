// importamos express
import express from 'express';
// importamos el archivo bbdd.js
import { USERS_BBDD } from "../bbdd.js";
// Creamos un router
const accountRouter = express.Router();

// middleware. Se ejecutará siempre antes del endpoint al que se llama
accountRouter.use((req, res, next) => {
    //Aquí le pasaremos la función que vamos a ejecutar
    console.log("Ejecutamos nuestra función definida en el middleware de account");
    // Continuamos con la siguiente función
    next();
});

// Obtener los detalles de una cuenta a partir del guid
accountRouter.get('/:guid', (req, res) => {
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const { guid } = req.params;
    const user = USERS_BBDD.find(user => user.guid === guid);
    // Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send();
    // Si existe respondemos con los detalles de la cuenta
    res.send(user);
});
// Crear una nueva cuenta
accountRouter.post('/', (req, res) => {
     // Extraemos el guid y nombre del body. Obligamos que estén los dos campos para crear un usuario
     const { guid, name } = req.body;
     // Si no existe guid o name recibidos por el body devolvemos un 400 (bad request)
     if (!guid || !name) return res.status(400).send();
      // Buscamos los detalles de la cuenta a través del guid recibido por req.params 
     const user = USERS_BBDD.find(user => user.guid === guid);
     // Si existe el usuario respondemos con un 409 (conflict), 
     // ya que no se puede crear una cuenta nueva con el mismo guid
     if (user) return res.status(409).send();
     // Creamos un objeto nuevo con los datos recibidos con el método push
     USERS_BBDD.push({
        guid, name
     });
     // Enviamos una respuesta
     res.send();

});
// Actualizar el nombre de una cuenta
accountRouter.patch('/:guid', (req, res) => {
    // Extraemos el guid de req.params
    const { guid } = req.params;
    // Extraemos el nombre del body
    const { name } = req.body;
    // Si no existe name devolvemos un 400 (bad request)
    if (!name) return res.status(400);
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params 
    const user = USERS_BBDD.find(user => user.guid === guid);
    // Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send();
    // Añadimos el nombre modificado y enviamos la respuesta
    user.name = name;
    res.send(user);
});
// Eliminar una cuenta
accountRouter.delete('/:guid', (req, res) => {
    // Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const { guid } = req.params;
    const userIndex = USERS_BBDD.findIndex(user => user.guid === guid);
    // Si no encuentra el guid (retorna -1 si no existe) respondemos con un 404 (not found)
    if (userIndex === -1) return res.status(404).send();
    // Eliminamos el índice de ese usuario del array
    USERS_BBDD.splice(userIndex, 1);
    // Enviamos simplemente una respuesta
    res.send();
});

export default accountRouter;