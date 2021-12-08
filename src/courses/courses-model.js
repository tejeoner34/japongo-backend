import { URI } from "../../config/bbdd.config.js";
import { MongoClient } from "mongodb";


export async function retrieveAllCourses(){
    const client = new MongoClient(URI);

    try{
        await client.connect();
        const db = client.db('JaponGo');
        const courses = db.collection('Courses');
        return await courses.find().toArray();

    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}
