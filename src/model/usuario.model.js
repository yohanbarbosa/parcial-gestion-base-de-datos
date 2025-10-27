import { connection } from "../services/mongoDb.service.js"

export const getUsuarioModel = async () => {
    const conn = await connection();
    const result = await conn.collection("usuario").find({}).toArray();
    return result;
}

export const postUsuarioModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("usuario").insertOne(info);
    return result;
}

export const postUsuarioManyModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("usuario").insertMany(info);
    return result;
}