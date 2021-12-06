
import { MongoClient } from "mongodb";
import { URI } from "../../config/bbdd.config.js";

const client = new MongoClient(URI);


//funcion que nos devuelve el email asociado a un token
export async function retrieveEmailByToken(token){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const register = db.collection('RegisterToken');
        const email = await register.findOne({token});
        return email.email;

    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}


//traigo los datos que tenemos en la coleccion de registroToken
export async function retrieveTokes(){

    try{
        await client.connect();
        const db = client.db('JaponGo');
        const register = db.collection('RegisterToken');
        return await register.find().toArray();
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
};



//funcion encargada de registrar token y email en bbdd
export async function registerToken(token, email){
    try{
        const data = {token, email}
        await client.connect();
        const db = client.db('JaponGo');
        const register = db.collection('RegisterToken');
        const doc = await register.insertOne(data);

    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}


//funcion encargada de encontrar un token y de eliminarlo
export async function deleteToken(token){
    try{
        await client.connect();
        const db = client.db('JaponGo');
        const register = db.collection('RegisterToken');
        const deleted = await register.findOneAndDelete({token});
        return deleted;
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
};

export async function validateToken(token){

    const email = await retrieveEmailByToken(token);
    if(email!== null){await deleteToken(token);}
    return email;

};