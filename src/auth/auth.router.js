import express from 'express';
import { createUser, sendToken, validateUserController } from './auth.controller.js';

const router = express.Router();


router.route('/login')
    .post(sendToken)
    


router.route('/register')
    .post(createUser)

    
router.route('/validate')
    .get(validateUserController)

// router.route('/reset-password')
//     .post()

export default router;