import express from 'express';
import { getAllCourses } from './courses-controller.js';

const router = express.Router();

router.route('/')
    .get(getAllCourses)

export default router;