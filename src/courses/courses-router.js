import express from 'express';
import { getAllCourses, getCourseById, postComment } from './courses-controller.js';

const router = express.Router();

router.route('/')
    .get(getAllCourses)

router.route('/course')
    .get(getCourseById)
    .post(postComment)




export default router;