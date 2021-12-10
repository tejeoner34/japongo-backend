import { URI } from "../../config/bbdd.config.js";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(URI);


export async function retrieveAllCourses(){

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
};

export async function retrieveCourseById(id){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const courses = db.collection('Courses');
        const exists = await courses.findOne({"_id" : ObjectId(id)});
        return exists
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
};

export async function addComment(id, comment){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const courses = db.collection('Courses');
        const i = await courses.updateOne({"_id":ObjectId(id)},{$push:{comments:comment}}, {upsert:true});  
        const comments = await courses.findOne({"_id":ObjectId(id)});
        return comments      
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
};


export async function deleteComment(id, comment){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const courses = db.collection('Courses');
        const i = await courses.updateOne({"_id":ObjectId(id)},{$pull:{comments:comment}}, {upsert:true});  
        const comments = await courses.findOne({"_id":ObjectId(id)});
        return comments      
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}
