import { MongoClient } from "mongodb";
import {URI} from '../../config/bbdd.config.js';

const client = new MongoClient(URI);

export async function retrieveAllReviews(){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const reviews = db.collection('Reviews');
        return await reviews.find().toArray();
    }catch(err){
        console.log(err)
    }finally{
        await client.close();
    }
};