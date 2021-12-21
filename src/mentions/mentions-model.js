import { MongoClient } from "mongodb";
import { URI } from "../../config/bbdd.config.js";

const client = new MongoClient(URI);

export async function retrieveMentionByName(name){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const users = db.collection('Mentions');
        const exists = await users.find({mentioneduser:name}).toArray();
        console.log(exists)
        return exists

    }catch(err){
        console.log(err)
    }finally{
        await client.close();

    }

}

export async function postOneMention(name, mention){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const users = db.collection('Users');
        const i = await users.updateOne({name},{$push:{mentions:mention}}, {upsert:false}); 
        console.log(i)
        return i 
        // const user = await users.findOne({name});
        // return user      
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

export async function deleteMention(name, mention){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const users = db.collection('Users');
        const i = await users.updateOne({name},{$pull:{mentions:mention}}, {upsert:true});  
        const user = await users.findOne({name});
        return user      
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}