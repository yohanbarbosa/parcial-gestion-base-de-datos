import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

export const connection  = async () => {
    try{
        await client.connect();
        return client.db("casa_apuestas");
    }catch(ex){
        console.error("❌ Error al conectar con MongoDB:", ex);
    }
}