import express from 'express';
import { deleteFavController, postFavController, retrieveuserInfo } from './users-controller.js';
import { validateJWTAuth } from '../auth/auth.middleware.js';


const router = express.Router();


// router.use(validateJWTAuth);
router.route('/')
    .all(validateJWTAuth)
    .get(retrieveuserInfo)
    // .delete()

router.route('/fav')
    .post(postFavController)
    .patch(deleteFavController)

export default router;


