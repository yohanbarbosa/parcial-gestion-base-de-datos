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


export const getUsuariosBySaldoModel = async (saldoMinimo) => {
    try {
        if (!connection) {
            await connectDB();
        }
        
        const db = await connection();
       
        const usuarios = await db.collection("usuario").find({ 
            saldo: { $gt: parseFloat(saldoMinimo) } 
        }).toArray();
        
        return usuarios;
        
    } catch (error) {
        console.error("❌ Error en getUsuariosBySaldoModel:", error.message);
        throw error;
    }
};