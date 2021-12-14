
import { MongoClient } from "mongodb";
import { URI } from "../../config/bbdd.config.js";

const client = new MongoClient(URI);


export async function createInfoUser(user){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const users = db.collection('InfoUsers');
        const newUser = {...user};
        const doc = await users.insertOne(newUser);
        return doc.insertedId;
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}