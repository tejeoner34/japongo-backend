import { encondePassword } from "../auth/auth.utils.js";
import { getElementByIdAndPassword } from "./users-model.js";


export async function checkPasswordMiddleware(req, res, next){
    const {email, password} = req.body;
    const passEncoded = encondePassword(password);
    const userinfo = await getElementByIdAndPassword(email, passEncoded);
    if(userinfo === null){
        res.status(403).json('Incorrect');
    }else{
        next();
    }
}