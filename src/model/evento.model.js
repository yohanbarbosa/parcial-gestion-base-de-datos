import { ObjectId } from "mongodb";
import { connection } from "../services/mongoDb.service.js";

export const getEventoModel = async () => {
  const conn = await connection();
  const result = await conn.collection("eventos").find({}).toArray();
  return result;
};

export const getEventosByDeporteModel = async (deporte) => {
  try {
    const db = await connection();
    const eventos = await db
      .collection("eventos")
      .find({ deporte: deporte })
      .toArray();
    return eventos;
  } catch (error) {
    console.error("❌ Error en getEventosByDeporteModel:", error.message);
    throw error;
  }
};

export const getEventosCuotaMayorModel = async () => {
  try {
    const db = await connection();
    const eventos = await db
      .collection("eventos")
      .find({ cuota_local: { $gt: 2.0 } })
      .toArray();
    return eventos;
  } catch (error) {
    console.error("❌ Error en getEventoByCuotaModel:", error.message);
    throw error;
  }
};
export const postEventoModel = async (info) => {
  const conn = await connection();
  const result = await conn.collection("eventos").insertOne(info);
  return result;
};

export const postEventoManyModel = async (info) => {
  const conn = await connection();
  const result = await conn.collection("eventos").insertMany(info);
  return result;
};

export const updateCuotaVisitanteModel = async (idEvento, nuevaCuota) => {
  try {
    const db = await connection();
    const result = await db
      .collection("eventos")
      .updateOne(
        { _id: new ObjectId(idEvento) },
        { $set: { cuota_visitante: nuevaCuota } }
      );
    return result;
  } catch (error) {
    console.error(" Error en updateCuotaVisitanteModel:", error.message);
    throw error;
  }
};

export const getEventoByIdModel = async (idEvento) => {
  const db = await connection();
  const result = await db.collection("eventos").findOne({
    _id: new ObjectId(idEvento),
  });
  return result;
};



export const deleteEventoModel = async (idEvento) => {
  try {
    const db = await connection();
    const result = await db
      .collection("eventos")
      .deleteOne({ _id: new ObjectId(idEvento) });
    return result;
  } catch (error) {
    console.error(" Error en deleteEventoModel:", error.message);
    throw error;
  }
};
