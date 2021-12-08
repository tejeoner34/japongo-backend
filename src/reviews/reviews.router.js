import express from 'express';
import { getAllReviews } from './reviews.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllReviews)

export default router;