import express from 'express';
import { createNewpass, createUser, sendResetPasswordEmail, sendToken, validateUserController } from './auth.controller.js';
import { validateJWTResetPassword } from './auth.middleware.js';
import multer from 'multer';
import path from 'path';
const __dirname = path.resolve()



const router = express.Router();

const test = null

// const storage = multer.diskStorage({
//     destination : (req, file, cb)=>{
//         cb(null, 'public\\img\\user-avatar')
//     },
//     filename: (req,file,cb)=>{
//         cb(null, Date.now() + path.extname(file.originalname));
//     }

// })

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/avatar'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }

});

const upload = multer({storage:storage})

const multerHelper = multer()


router.route('/login')
    .post(sendToken)
    


router.route('/register')
    .post(upload.single("avatar"), createUser)

    
router.route('/validate')
    .get(validateUserController)


router.route('/forgot-password')
    .post(sendResetPasswordEmail)


router.route('/resset-password')
    .patch(validateJWTResetPassword, createNewpass)

export default router;