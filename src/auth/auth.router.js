import express from 'express';
import { createNewpass, createUser, sendResetPasswordEmail, sendToken, validateUserController } from './auth.controller.js';
import { validateJWTResetPassword } from './auth.middleware.js';

const router = express.Router();


router.route('/login')
    .post(sendToken)
    


router.route('/register')
    .post(createUser)

    
router.route('/validate')
    .get(validateUserController)


router.route('/forgot-password')
    .post(sendResetPasswordEmail)


router.route('/resset-password')
    .patch(validateJWTResetPassword, createNewpass)

export default router;