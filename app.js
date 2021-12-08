import express from 'express';
import AuthRouter from './src/auth/auth.router.js';
import UserRouter from './src/users/users-router.js';
import ReviewsRouter from './src/reviews/reviews.router.js';
import CoursesRouter from './src/courses/courses-router.js'
import cors from 'cors';


const app = express();

app.use(cors());

app.use(express.json());



app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/reviews', ReviewsRouter);
app.use('/courses', CoursesRouter)



app.listen(4567, () => console.log('Server on'))