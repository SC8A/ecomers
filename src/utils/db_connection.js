import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import 'dotenv/config'

const database_name=process.env.database_name
const database_passwd=process.env.database_passwd
const adminDb = process.env.user_mongodb

export async function mongoDbconnection(){
    try {
        const uri = `mongodb+srv://${adminDb}:${database_passwd}@${database_name}.cljhjtz.mongodb.net/test`
        mongoose.connect(uri)    
        console.log("Mongo db is connected");
    } catch (error) {
       console.log({error}); 
    }    
}
