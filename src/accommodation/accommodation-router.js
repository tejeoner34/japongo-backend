import express from 'express';
import { getAllAccommodationsController } from './accommodation-controller.js';

const router = express.Router();

router.route('/')
    .get(getAllAccommodationsController)

export default router;

