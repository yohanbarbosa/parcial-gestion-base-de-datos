import { connection } from "../services/mongoDb.service.js"

export const getApuestaModel = async () => {
    const conn = await connection();
    const result = await conn.collection("apuesta").find({}).toArray();
    return result;
}


export const postApuestaModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("apuesta").insertOne(info);
    return result;
}

export const postApuestaManyModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("apuesta").insertMany(info);
    return result;
}