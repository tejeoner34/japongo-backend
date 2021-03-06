import { retrieveUsers, createOneUSer, getElementbyID, getElementByIdAndPassword, emailVerification, getUserByEmailOrName, updatePass } from "../users/users-model.js";
import jwt from 'jsonwebtoken';
// import { secret } from "./secret.js";
import { encondePassword, generateRandomEmailToken } from "../auth/auth.utils.js";
import { registerToken, validateToken } from "./auth.model.js";
import { sendMail } from "../adapters/mail.js";
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const secreto = process.env.SECRET 

//generamos un token con el secreto y el email del usuario. Introducido por el login
function generateToken(email) {
    return jwt.sign(email, secreto);
};


// funcion que se encargará de validar que el usuario está en la base de datos. Una vez validado se le enviará el token. (loginJWTController)
export const sendToken = async (req, res) => {
    const { email, password } = req.body;
    const passEncoded = encondePassword(password)
    const userinfo = await getElementByIdAndPassword(email, passEncoded);
    if (userinfo !== null) {

        const token = generateToken({ email: req.body.email });
        res.json({ token, ...userinfo });
    } else {
        res.status(404).json('Usuario/Contraseña erróneos');
    }


}


//funcion para obtener todos los usuarios en la base de datos
export async function getAllUsers(req, res) {

    const users = await retrieveUsers();
    res.json(users);

}



// funcion que nos promete crear un usuario en la base de datos si se cumple la validación de no existir

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    });

export const createUser = async (req, res) => {


    const profileBackgroundImg = {
        url: 'https://res.cloudinary.com/dejzrr9lt/image/upload/v1640681604/BACKGROUND/profile-background_iyn2b6.jpg',
        imgID: null
    };
    const { email, password, name } = req.body;
    const body = req.body;
    delete body.repeatedPassword
    const foundUser = await getUserByEmailOrName(name, email);


    if (foundUser === null) {

        req.body.password = encondePassword(password);

        const uploadedResponse = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'AVATAR'});
        const file ={
            url: uploadedResponse.secure_url,
            imgID: uploadedResponse.public_id
        }
        await createOneUSer({...body, file, profileBackgroundImg });
        const tokenEmailVerfication = generateRandomEmailToken();
        await registerToken(tokenEmailVerfication, email);
        sendMail(email, 'Verify your email', `<a href="https://tejeoner34.github.io/japongo/validate-mail?token=${tokenEmailVerfication}">Verify my email</a>`)
        //nos quedamos aqui. tenemos que mandar el email al fronto
        res.status(201).json('ok');
    } else {
        res.status(409).json('user exists');
    }
}


export async function validateUserController(req, res) {
    const email = await validateToken(req.query.token);
    if (email !== null) {
        await emailVerification(email);
        res.status(200).send('ok');
    } else {
        res.status(400).send('invalid token')
    }
}

export async function sendResetPasswordEmail(req, res){

    const user = await getElementbyID(req.body.email);
    if(user === null){
        res.status(403).json('user does not exist')
    }else{
       const token=  generateToken(req.body.email);
        sendMail(req.body.email, 'To change your password please click in this link', `<a href="https://tejeoner34.github.io/japongo/reset-password?token=${token}">Reset Password</a>`)
        res.status(201).json('ok');
    }
}

export async function createNewpass(req, res){
    const {password} = req.body;
    const encondedPass = encondePassword(password);
    const updated = await updatePass(req.email, encondedPass);
    if(updated===undefined){
        res.status(500)
    }else{
        res.status(201).json('Password Updated')

    } 
}

