import express from 'express';
import { deleteCommentController, getAllCourses, getCourseById, postComment } from './courses-controller.js';

const router = express.Router();

router.route('/')
    .get(getAllCourses)

router.route('/course')
    .get(getCourseById)
    .post(postComment)
    .patch(deleteCommentController)




export default router;