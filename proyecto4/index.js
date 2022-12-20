//importamos el módulo express
import express from "express";
//importamos dotenv
import dotenv from "dotenv";
//importamos morgan
import logger from "morgan";
//importamos accountRouter
import accountRouter from "./routes/account.js";

//Añadimos el método config de dotenv
dotenv.config();


//Definimos el puerto
const PORT = process.env.PORT;
const expressApp = express();

//middleware para interpretar el formato json y text enviados desde el cliente http
expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use(logger('dev'));
//middleware que hemos importado del router accountRouter
expressApp.use("/account", accountRouter);

expressApp.get("/user", (req, res) => {
    res.send("Endpoint fuera del account")
    })

//Levantamos el servidor en el puerto 3000
expressApp.listen(PORT, () =>
console.log(`Server in port ${PORT}`));