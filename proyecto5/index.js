//importamos el módulo express
import express from "express";
//importamos dotenv
import dotenv from "dotenv";
//importamos morgan
import logger from "morgan";
//importamos accountRouter
import accountRouter from "./routes/account.js";
// importamos authRouter
import authRouter from "./routes/auth.js";
//importamos authSessionRouter
import authSessionRouter from "./routes/authsession.js";
// importamos nanoid
import { nanoid } from 'nanoid'
//importamos cookie-parser
import cookieParser from "cookie-parser";

// Generamos un identificador con la libreria nanoid
const sessionId = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"
const sessions = [];
// Añadimos el sessionId al array
sessions.push({sessionId});


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
// middleware que hemos importado del router authRouter
expressApp.use("/auth", authRouter);
// middleware que hemos importado del router authSessionRouter
expressApp.use("/auth-session", authSessionRouter)
// middleware que hemos importado del router cookieParser
expressApp.use(cookieParser())

expressApp.get("/user", (req, res) => {
    res.send("Endpoint fuera del account")
    })

//Levantamos el servidor en el puerto 3000
expressApp.listen(PORT, () =>
console.log(`Server in port ${PORT}`));