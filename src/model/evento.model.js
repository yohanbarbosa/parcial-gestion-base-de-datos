import { connection } from "../services/mongoDb.service.js"

export const getEventoModel = async () => {
    const conn = await connection();
    const result = await conn.collection("eventos").find({}).toArray();
    return result;
}

export const getEventosByDeporteModel = async (deporte) => {
    try {
        const db = await connection();
        const eventos = await db.collection("eventos").find({ deporte: deporte }).toArray();
        return eventos;
        
    } catch (error) {
        console.error("❌ Error en getEventosByDeporteModel:", error.message);
        throw error;
    }
};

export const postEventoModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("eventos").insertOne(info);
    return result;
}

export const postEventoManyModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("eventos").insertMany(info);
    return result;
}




