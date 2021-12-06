// import { retrieveUsers, createOneUSer, getElementbyID, getElementByIdAndPassword } from "./users-model.js";
// import jwt from 'jsonwebtoken';
// import {secret} from '../auth/secret.js';
// import { generatePrimeSync } from "crypto";
// import { generateRandomEmailToken } from "../auth/auth.utils.js";

import { getElementbyID } from "./users-model.js"


// //generamos un token con el secreto y el email del usuario. Introducido por el login
// function generateToken(email){
//     return jwt.sign(email, secret);
// };


// // funcion que se encargará de validar que el usuario está en la base de datos. Una vez validado se le enviará el token.
// export async function sendToken(req, res){
//     const {email, password} =req.body;
//     const userinfo = await getElementByIdAndPassword(email, password);
//     if(userinfo !== undefined){
//         const token = generateToken({email:req.body.email});
//         res.json(token);
//     }else{
//         res.status(404).send('Usuario/Contraseña erróneos');
//     }
    

// }


// //funcion para obtener todos los usuarios en la base de datos
// export async function getAllUsers(req, res){

//     const users = await retrieveUsers();
//     res.json(users);

// }


// // funcion que nos promete crear un usuario en la base de datos si se cumple la validación de no existir
// export async function createUser(req, res){

//     const { email, password } = req.body;

//     const foundUser = await getElementbyID(email);

//     if(foundUser===undefined){
//         await createOneUSer(req.body);
//         const tokenEmailVerfication = generateRandomEmailToken();

//     }else{
//         res.sendStatus(409)
//     }
// }

export const retrieveuserInfo= async(req, res)=>{

    const userinfo = await getElementbyID(req.email);
    delete userinfo.password;
    res.json(userinfo)


}