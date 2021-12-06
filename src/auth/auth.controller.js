import { retrieveUsers, createOneUSer, getElementbyID, getElementByIdAndPassword, emailVerification } from "../users/users-model.js";
import jwt from 'jsonwebtoken';
import { secret } from "./secret.js";
import { generateRandomEmailToken } from "../auth/auth.utils.js";
import { registerToken, validateToken } from "./auth.model.js";
import { sendMail } from "../adapters/mail.js";


//generamos un token con el secreto y el email del usuario. Introducido por el login
function generateToken(email) {
    return jwt.sign(email, secret);
};


// funcion que se encargará de validar que el usuario está en la base de datos. Una vez validado se le enviará el token. (loginJWTController)
export const sendToken =async(req, res)=> {
    const { email, password } = req.body;
    const userinfo = await getElementByIdAndPassword(email, password);
    console.log(userinfo);
    if (userinfo !== null) {
        
        const token = generateToken({ email: req.body.email });
        console.log(token)
        res.json(token);
    } else {
        res.status(404).send('Usuario/Contraseña erróneos');
    }


}


//funcion para obtener todos los usuarios en la base de datos
export async function getAllUsers(req, res) {

    const users = await retrieveUsers();
    res.json(users);

}


// funcion que nos promete crear un usuario en la base de datos si se cumple la validación de no existir
export const createUser = async(req, res)=> {

    const { email, password } = req.body;

    const foundUser = await getElementbyID(email);
    console.log(foundUser);

    if (foundUser === null) {
        await createOneUSer(req.body);
        const tokenEmailVerfication = generateRandomEmailToken();
        await registerToken(tokenEmailVerfication, email);
        sendMail(email, 'Verifica tu cuenta para seguir con el registro', `<a href="http://localhost:3000/validate-mail?token=${tokenEmailVerfication}">Verificar</a>`)
        //nos quedamos aqui. tenemos que mandar el email al fronto
        res.status(201);
    } else {
        res.status(409).send('user exists');
    }
}


export async function validateUserController(req, res){
    console.log(req.query.token);
    const email = await validateToken(req.query.token);
    if(email !== null){
       await emailVerification(email);
       res.status(200).send('ok');
    }else{
        res.status(400).send('invalid token')
    }
}