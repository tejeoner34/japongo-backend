import { MongoClient } from "mongodb";
import { URI } from "../../config/bbdd.config.js";

const client = new MongoClient(URI);

export async function retrieveAccommodations(){
    try{

        await client.connect();
        const db = client.db('JaponGo');
        const accommodations = db.collection('Accommodations');
        return await accommodations.find().toArray();

    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
};

export async function retrieveAccommodationByLocation(latitude, longitude){
    try{

        const latitudePlus = latitude + 0.05;
        const latitudeMinus = latitude - 0.05;
        const longitudePlus = longitude + 0.05;
        const longitudeMinus = longitude - 0.05;
        
        await client.connect();
        const db = client.db('JaponGo');
        const accommodations = db.collection('Accommodations');
        // return await accommodations.find({"location.lat": })
        return await accommodations.find({$and:[{"location.lat": {$gte:latitudeMinus, $lt:latitudePlus}}, {"location.lng":{$gte:longitudeMinus, $lt:longitudePlus} }]}).toArray();

    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}