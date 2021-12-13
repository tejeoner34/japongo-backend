import { retrieveSchools } from "./schools-model.js";


export async function getAllSchoolsController(req, res){
    const schools = await retrieveSchools();
    res.json(schools).status(200);
}