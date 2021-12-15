import { getSchoolById, retrieveSchools } from "./schools-model.js";


export async function getAllSchoolsController(req, res){
    const schools = await retrieveSchools();
    res.json(schools).status(200);
}

export async function getSchoolByIdController(req,res){
    const schools = await getSchoolById(req.query.id);
    if(schools === null){
        res.status(404).json('School does no exist')
    }else{
        res.status(200).json(schools)
    }
}