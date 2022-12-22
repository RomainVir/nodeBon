//importamos el módulo express
import express from "express";
//importamos dotenv
import dotenv from "dotenv";
//importamos morgan
import logger from "morgan";
//importamos cookie-parser
import cookieParser from "cookie-parser";
// importamos authRouter

// importamos nanoid
import { nanoid } from "nanoid";

import apiRouter from "./routes/api.js";

// Generamos un identificador con la libreria nanoid
const sessionId = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"
const sessions = [];
// Añadimos el sessionId al array
sessions.push({ sessionId });

//Añadimos el método config de dotenv
dotenv.config();

//Definimos el puerto
const PORT = process.env.PORT;
const expressApp = express();

//middleware para interpretar el formato json y text enviados desde el cliente http
expressApp.use(express.json());
expressApp.use(express.text());
// middleware que hemos importado del router cookieParser
expressApp.use(cookieParser());
expressApp.use(logger("dev"));



expressApp.get("/user", (req, res) => {
  res.send("Endpoint fuera del account");
});

expressApp.use("/api", apiRouter);

//Levantamos el servidor en el puerto 3000
expressApp.listen(PORT, () =>
  console.log(`CONECTADO HOMBRE !!! - Server in port ${PORT}`)
);
