import { retrieveAllCourses } from "./courses-model.js";

export async function getAllCourses(req, res){
    const courses = await retrieveAllCourses();
    res.json(courses);
}