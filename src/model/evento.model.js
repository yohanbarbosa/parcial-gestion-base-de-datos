import { connection } from "../services/mongoDb.service.js"

export const getEventoModel = async () => {
    const conn = await connection();
    const result = await conn.collection("evento").find({}).toArray();
    return result;
}

export const getEventosByDeporteModel = async (deporte) => {
    try {
        if (!connection) {
            await connectDB();
        }
        const db = await connection();
        const eventos = await db.collection("evento").find({ deporte: deporte }).toArray();
        return eventos;
        
    } catch (error) {
        console.error("❌ Error en getEventosByDeporteModel:", error.message);
        throw error;
    }
};

export const postEventoModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("evento").insertOne(info);
    return result;
}

export const postEventoManyModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("evento").insertMany(info);
    return result;
}




