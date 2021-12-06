import express from 'express';
import { retrieveuserInfo } from './users-controller.js';
import { validateJWTAuth } from '../auth/auth.middleware.js';


const router = express.Router();


router.use(validateJWTAuth);
router.route('/')
    .get(retrieveuserInfo)

export default router;


