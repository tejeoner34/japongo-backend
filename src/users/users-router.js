import express from 'express';
import { deleteFavController, deleteOneUserController, postFavController, retrieveuserInfo, updateAvatarController, updateBackgroundImgController, updatePassController } from './users-controller.js';
import { validateJWTAuth } from '../auth/auth.middleware.js';
import { checkPasswordMiddleware } from './user.middleware.js';
import multer from 'multer';
import path from 'path';
const __dirname = path.resolve()



const router = express.Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/avatar'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }

});
const upload = multer({ storage: storage })


const storageBackgroundImg = multer.diskStorage({
    destination: path.join(__dirname, 'public/profile-background'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }

});

const uploadBackgroundImg = multer({storage: storageBackgroundImg})





// router.use(validateJWTAuth);
router.route('/')
    // .all(validateJWTAuth)
    .get(validateJWTAuth, retrieveuserInfo)
    .delete(checkPasswordMiddleware, deleteOneUserController)
    .patch(checkPasswordMiddleware, updatePassController)

router.route('/fav')
    .post(postFavController)
    .patch(deleteFavController)

router.route('/change-avatar')
    .patch(upload.single("avatar"), updateAvatarController)

router.route('/change-background')
    .patch(uploadBackgroundImg.single("profile-background"), updateBackgroundImgController)




export default router;


