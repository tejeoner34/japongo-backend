import express from 'express';
import { getMentionByNameController, postMentionController } from './mentions-controller.js';

const router = express.Router();

router.route('/')
    .get(getMentionByNameController)
    .post(postMentionController)

export default router;