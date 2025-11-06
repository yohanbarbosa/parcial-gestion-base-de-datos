import { connection } from "../services/mongoDb.service.js";

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
              estado: { $regex: `^${estado.trim()}$`, $options: "i" } 
            } 
          },
          {
            $lookup: {
              from: "usuarios",
              localField: "usuario",
              foreignField: "_id",
              as: "usuario_info"
            },
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
              "nombre_usuario": "$usuario_info.nombre",
              "deporte": "$evento_info.deporte", 
              "posible_ganancia": 1
            }
          }
        ])
        .toArray();
        
      return apuestas;
    } catch (error) {
      console.error("❌ Error en getApuestaByEstadoModel:", error.message);
      throw error;
    }
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
