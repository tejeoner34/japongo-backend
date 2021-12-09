import { addComment, retrieveAllCourses, retrieveCourseById } from "./courses-model.js";

export async function getAllCourses(req, res){
    const courses = await retrieveAllCourses();
    res.json(courses);
};

export async function getCourseById(req, res){
    
    const course = await retrieveCourseById(req.query.id)
    res.json(course)
}

export async function postComment(req, res){
  const data = await addComment(req.query.id, req.body);
  res.json(data)
}