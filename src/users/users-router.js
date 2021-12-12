import express from 'express';
import { deleteFavController, deleteOneUserController, postFavController, retrieveuserInfo, updatePassController } from './users-controller.js';
import { validateJWTAuth } from '../auth/auth.middleware.js';
import { checkPasswordMiddleware } from './user.middleware.js';


const router = express.Router();


// router.use(validateJWTAuth);
router.route('/')
    // .all(validateJWTAuth)
    .get(validateJWTAuth, retrieveuserInfo)
    .delete(checkPasswordMiddleware, deleteOneUserController)
    .patch(checkPasswordMiddleware, updatePassController)

router.route('/fav')
    .post(postFavController)
    .patch(deleteFavController)

export default router;


