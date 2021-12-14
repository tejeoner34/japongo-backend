import express from 'express';
import { createInfoUserController } from './info-users-controller.js';

const router = express.Router();

router.route('/')
    .post(createInfoUserController)


export default router;