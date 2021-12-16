import express from 'express';
import { deleteCommentController, deleteOneUserCommentsController, getAllCourses, getCourseById, postComment } from './courses-controller.js';

const router = express.Router();

router.route('/')
    .get(getAllCourses)
    .patch(deleteOneUserCommentsController)

router.route('/course')
    .get(getCourseById)
    .post(postComment)
    .patch(deleteCommentController)






export default router;