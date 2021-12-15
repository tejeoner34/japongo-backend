import { getSchoolById } from "../schools/schools-model.js";
import { createInfoUser } from "./info-users-model.js";


export async function createInfoUserController(req, res){
    const schoolInfo = await getSchoolById(req.body.token);
    const schoolName = schoolInfo.name;
    const user = {...req.body, schoolName};
    delete user.token;
    const id = await createInfoUser(user)
    res.status(201).json(id);
}