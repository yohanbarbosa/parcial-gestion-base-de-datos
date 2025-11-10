import { connection } from "../services/mongoDb.service.js";
import { ObjectId } from "mongodb";

export const getApuestaModel = async () => {
  const conn = await connection();
  const result = await conn.collection("apuestas").find({}).toArray();
  return result;
};

export const getApuestaByEstadoModel = async (estado) => {
  try {
    const db = await connection();
    const apuestas = await db
      .collection("apuestas")
      .aggregate([
        {
          $match: {
            estado: { $regex: `^${estado.trim()}$`, $options: "i" },
          },
        },
        {
          $lookup: {
            from: "usuarios",
            localField: "usuario",
            foreignField: "_id",
            as: "usuario_info",
          },
        },
        {
          $lookup: {
            from: "eventos",
            localField: "evento",
            foreignField: "_id",
            as: "evento_info",
          },
        },
        {
          $unwind: "$usuario_info",
        },
        {
          $unwind: "$evento_info",
        },
        {
          $project: {
            _id: 0,
            nombre_usuario: "$usuario_info.nombre",
            deporte: "$evento_info.deporte",
            posible_ganancia: 1,
          },
        },
      ])
      .toArray();

    return apuestas;
  } catch (error) {
    console.error("❌ Error en getApuestaByEstadoModel:", error.message);
    throw error;
  }
};

export const getApuestaByBaloncestoModel = async () => {
  try {
    const db = await connection();
    const resultados = await db
      .collection("apuestas")
      .aggregate([
        {
          $lookup: {
            from: "eventos",
            localField: "evento",
            foreignField: "_id",
            as: "evento_data",
          },
        },

        {
          $match: {
            "evento_data.deporte": "Baloncesto",
          },
        },

        {
          $lookup: {
            from: "usuarios",
            localField: "usuario",
            foreignField: "_id",
            as: "usuario_data",
          },
        },

        {
          $project: {
            _id: 0,
            correo: { $arrayElemAt: ["$usuario_data.correo", 0] },
            pais: { $arrayElemAt: ["$usuario_data.pais", 0] },
          },
        },
      ])
      .toArray();
    return resultados;
  } catch (error) {
    console.error("❌ Error en getApuestaByBaloncestoModel:", error.message);
    throw error;
  }
};

export const getApuestaByIdModel = async (idApuesta) => {
  const db = await connection();
  const result = await db.collection("apuestas").findOne({
    _id: new ObjectId(idApuesta),
  });
  return result;
};

export const getTotalApuestaUsuarioModel = async () => {
  const db = await connection();
  const result = await db
    .collection("apuestas")
    .aggregate([
      {
        $lookup: {
          from: "usuarios",
          localField: "usuario",
          foreignField: "_id",
          as: "usuario_info",
        },
      },
      {
        $unwind: "$usuario_info",
      },
      {
        $group: {
          _id: "$usuario",
          nombre: { $first: "$usuario_info.nombre" },
          correo: { $first: "$usuario_info.correo" },
          total_apostado: { $sum: "$monto_apostado" },
          cantidad_apuestas: { $sum: 1 },
        },
      },
      {
        $sort: { total_apostado: -1 },
      },
    ])
    .toArray();

    return result;
};


export const updateEstadoApuestaModel = async (idApuesta, inputEstado) => {
  const db = await connection();
  const result = await db
    .collection("apuestas")
    .updateOne(
      { _id: new ObjectId(idApuesta) },
      { $set: { estado: inputEstado } }
    );
  return result;
};

export const postApuestaModel = async (info) => {
  const conn = await connection();
  const result = await conn.collection("apuestas").insertOne(info);
  return result;
};

export const postApuestaManyModel = async (info) => {
  const conn = await connection();
  const result = await conn.collection("apuestas").insertMany(info);
  return result;
};


export const getApuestasCompletasModel = async () => {
  const db = await connection();
  
  const resultado = await db.collection("apuestas")
    .aggregate([
      {
        $lookup: {
          from: "usuarios",
          localField: "usuario",
          foreignField: "_id",
          as: "usuario_info"
        }
      },
      {
        $lookup: {
          from: "eventos",
          localField: "evento", 
          foreignField: "_id",
          as: "evento_info"
        }
      },
      {
        $unwind: "$usuario_info"
      },
      {
        $unwind: "$evento_info"
      },
      {
        $project: {
          _id: 0,
          nombre: "$usuario_info.nombre",
          deporte: "$evento_info.deporte",
          monto_apostado: 1,
          posible_ganancia: 1,
          estado: 1,
          // Campos adicionales opcionales
          tipo_apuesta: 1,
          fecha_apuesta: 1,
          equipos: {
            $cond: {
              if: { $and: ["$evento_info.equipo_local", "$evento_info.equipo_visitante"] },
              then: { $concat: ["$evento_info.equipo_local", " vs ", "$evento_info.equipo_visitante"] },
              else: "Evento individual"
            }
          }
        }
      },
      {
        $sort: { fecha_apuesta: -1 }
      }
    ])
    .toArray();
  
  return resultado;
};