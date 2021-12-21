import express from 'express';
import { deleteMentionController, getMentionByNameController, postMentionController } from './mentions-controller.js';

const router = express.Router();

router.route('/')
    .get(getMentionByNameController)
    .post(postMentionController)
    .patch(deleteMentionController)

export default router;