import { MongoClient } from "mongodb";
import {URI} from '../../config/bbdd.config.js';

const client = new MongoClient(URI);

export async function retrieveUsers(){
    try{

        await client.connect();
        const db = client.db('JaponGo');
        const users = db.collection('Users');
        return await users.find().toArray();

    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
};

export async function createOneUSer(user){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const users = db.collection('Users');
        const newUser = {...user, status:'PENDING_EMAIL_VALIDATION'};
        const doc = await users.insertOne(newUser);
        return doc.insertedId;
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

export async function getElementbyID(email){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const users = db.collection('Users');
        const exists = await users.findOne({email, status:'SUCCESS'});
        return exists

    }catch(err){
        console.log(err)
    }finally{
        await client.close();

    }
};

export async function getElementByIdAndPassword(email, password){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const users = db.collection('Users');
        const exists =await users.findOne({email,password,status:'SUCCESS'});
        return  exists

    }catch(err){
        console.log(err)
    }finally{
        await client.close();

    }
}

export async function emailVerification(email){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const users = db.collection('Users');
        const i = await users.updateOne({email},{$set:{status:'SUCCESS'}}, {upsert:true});

    }catch(err){
        console.log(err)
    }finally{
        await client.close();

    }
}