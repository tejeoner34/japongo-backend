import { MongoClient, ObjectId } from "mongodb";
import {URI} from '../../config/bbdd.config.js';

const client = new MongoClient(URI);

export async function retrieveSchools(){
    try{

        await client.connect();
        const db = client.db('JaponGo');
        const schools = db.collection('Schools');
        return await schools.find().toArray();

    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
};


export async function getSchoolById(id){
    
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const schools = db.collection('Schools');
        const exists = await schools.findOne({"_id" : ObjectId(id)});
        return exists
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}