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

export const getPromedioCuotasDeporteModel = async () => {
  const db = await connection();
  
  const resultado = await db.collection("eventos")
    .aggregate([
      {
        $group: {
          _id: "$deporte",
          total_eventos: { $sum: 1 },
          promedio_cuota_local: { $avg: "$cuota_local" },
          promedio_cuota_empate: { $avg: "$cuota_empate" },
          promedio_cuota_visitante: { $avg: "$cuota_visitante" },
          // Estadísticas adicionales
          max_cuota_local: { $max: "$cuota_local" },
          min_cuota_local: { $min: "$cuota_local" }
        }
      },
      {
        $project: {
          _id: 1,
          total_eventos: 1,
          promedio_cuota_local: { $round: ["$promedio_cuota_local", 2] },
          promedio_cuota_empate: { $round: ["$promedio_cuota_empate", 2] },
          promedio_cuota_visitante: { $round: ["$promedio_cuota_visitante", 2] },
          max_cuota_local: 1,
          min_cuota_local: 1
        }
      },
      {
        $sort: { total_eventos: -1 }
      }
    ])
    .toArray();
  
  return resultado;
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
