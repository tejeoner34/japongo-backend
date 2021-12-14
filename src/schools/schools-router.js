import express from 'express';
import { getAllSchoolsController, getSchoolByIdController } from './schools-controller.js';


const router = express.Router();


router.route('/')
    .get(getAllSchoolsController)


router.route('/school')
    .get(getSchoolByIdController)

export default router;