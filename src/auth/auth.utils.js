
import crypto from 'crypto';

const salt= process.env.SALT;
const digest = process.env.DIGEST

export const encondePassword = (pass) =>{
    return crypto.pbkdf2Sync(pass, salt,1000, 64, digest).toString(`hex`);
};

export const generateRandomEmailToken = () => {
    return crypto.randomBytes(128).toString('hex');
}