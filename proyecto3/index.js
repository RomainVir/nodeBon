//importamos el módulo express
import express from "express";
//importamos dotenv
import dotenv from "dotenv";
//importamos el archivo bbdd.js
import {USERS_BBDD} from "./bbdd.js"
//importamos morgan
import logger from "morgan";

//Añadimos el método config de dotenv
dotenv.config();


//Definimos el puerto
const PORT = process.env.PORT;
const expressApp = express();

//middleware para interpretar el formato json y text enviados desde el cliente http
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(logger('dev'));

//Obtener los detalles de una cuenta a partir del guid
expressApp.get('/account/:guid', (req, res) =>  {
    //Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const {guid} = req.params;
    const user = USERS_BBDD.find((user) => user.guid === guid);
    //Si no existe el usuario respondemos con un 404 (not found)
    if (!user) return res.status(404).send()
    //Si existe respondemos ocn los detalles de la cuenta
    res.send(user);
});
//Crear una nueva cuenta a partir del guid y name
expressApp.post('/account', (req, res) =>  {
    //Extraemos el guid y nombre del body. Obligamos que estén los dos campos para crear un usuario
    const {guid, name} = req.body;
    //Si no existe guid o name recibimos el body devolvemos un 400(bad request)
    if(!guid || !name) return res.status(400).send();
    //Buscamos los detalles de la cuenta a través del guid recibido por req.params
    const user = USERS_BBDD.find(user => user.guid === guid);
     // Si existe el usuario respondemos con un 409 (conflic), 
     // ya que no se puede crear una cuenta nueva con el mismo guid
     if (user) return res.status(409).send();
     // Creamos un objeto nuevo con los datos recibidos con el método push
     USERS_BBDD.push({
        guid, name
     });
     // Enviamos una respuesta
     res.send();


});
//Actualizar una nueva cuenta (en lugar de patch también se puede usar put, que si no existe lo crea)
expressApp.patch('/account/:guid', (req, res) =>  {
    //Extraemos el guid de params
    const {guid} = req.params;
    //Extraemos el nombre del body
    const {name} = req.body;
    const user = USERS_BBDD.find((user) => user.guid === guid);
    //Si no existe named evolvemos 400 (bad request)

    if (!name) return res.status(400).send()
    if (!user) return res.status(404).send();
    //Buscamos los detalles de la cuenta a través del guid recibido por req.params
   
    //Si no existe el usuario respondemos con un 404 (not found)
    
    //Añadimos el nombre modificado y enviamos la respuesta
    user.name=name;
    res.send(user);
});
//Eliminar una cuenta
expressApp.delete('/account/:guid', (req, res) =>  {
    const {guid} = req.params;
    const userIndex = USERS_BBDD.findIndex((user) => user.guid === guid);
    //Si no encuentra el guid (retorna -1 si no existe) respondemos con un 404
    if (userIndex === -1) return res.status(404).send()
    //Eliminamos el índice de ese usuario del array
    USERS_BBDD.splice(userIndex, 1)
    //Enviamos simplemente una respuesta
    res.send("Account deleted");
});

//Levantamos el servidor en el puerto 3000
expressApp.listen(PORT, () =>
console.log(`Server in port ${PORT}`));