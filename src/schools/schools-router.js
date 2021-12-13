import express from 'express';
import { getAllSchoolsController } from './schools-controller.js';

const router = express.Router();


router.route('/')
    .get(getAllSchoolsController)

export default router;