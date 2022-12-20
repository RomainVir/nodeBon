//importamos express
import express from 'express'
//importamos el archivo bbdd.js
import {USERS_BBDD} from "../bbdd.js"
//Creamos un router
const accountRouter = express.Router();

//middleware. Se ejecutará siempre antes del endpointal que se llama
accountRouter.use((req,res,next) => {
    //Aquí le pasaremos la función que vamos a ejecutar
    console.log("Ejecutamos nuestra función definida en el middleware de account")
    next();
})

//Obtener los detalles de una cuenta a partir del guid
accountRouter.get('/:guid', (req, res) =>  {
    const {guid} = req.params;
    const user = USERS_BBDD.find((user) => user.guid === guid);
    if (!user) return res.status(404).send()
    res.send(user);
});
//Crear una nueva cuenta a partir del guid y name
accountRouter.post('/', (req, res) =>  {
    
});
//Actualizar una nueva cuenta (en lugar de patch también se puede usar put, que si no existe lo crea)
accountRouter.patch('/:guid', (req, res) =>  {
    
});
//Eliminar una cuenta
accountRouter.delete('/:guid', (req, res) =>  {
    
});

export default accountRouter;