import express from 'express';
import AuthRouter from './src/auth/auth.router.js';
import UserRouter from './src/users/users-router.js';
import ReviewsRouter from './src/reviews/reviews.router.js';
import CoursesRouter from './src/courses/courses-router.js';
import SchoolsRouter from './src/schools/schools-router.js';
import InfoUsersRouter from './src/infoUsers/info-users-router.js';
import cors from 'cors';


const app = express();

app.use(cors());

app.use(express.static('public'))

app.use(express.json());



app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/reviews', ReviewsRouter);
app.use('/courses', CoursesRouter);
app.use('/schools', SchoolsRouter);
app.use('/info', InfoUsersRouter);



app.listen(4567, () => console.log('Server on'))