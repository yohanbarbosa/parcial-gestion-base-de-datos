import { connection } from "../services/mongoDb.service.js"
import { ObjectId } from "mongodb";

export const getUsuarioModel = async () => {
    const conn = await connection();
    const result = await conn.collection("usuarios").find({}).toArray();
    return result;
}

export const postUsuarioModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("usuarios").insertOne(info);
    return result;
}

export const postUsuarioManyModel = async (info) => {
    const conn = await connection();
    const result = await conn.collection("usuarios").insertMany(info);
    return result;
}


export const getUsuariosBySaldoModel = async (saldoMinimo) => {
    try {
        if (!connection) {
            await connectDB();
        }
        
        const db = await connection();
       
        const usuarios = await db.collection("usuarios").find({ 
            saldo: { $gt: parseFloat(saldoMinimo) } 
        }).toArray();
        
        return usuarios;
        
    } catch (error) {
        console.error("❌ Error en getUsuariosBySaldoModel:", error.message);
        throw error;
    }
};


export const getUsuarioMayorGananciaModel = async () => {
    const db = await connection();
    
    const resultado = await db.collection("apuestas")
      .aggregate([
        {
          $match: {
            estado: "ganada"
          }
        },
        {
          $lookup: {
            from: "usuarios",
            localField: "usuario",
            foreignField: "_id",
            as: "usuario_info"
          }
        },
        {
          $unwind: "$usuario_info"
        },
        {
          $addFields: {
            ganancia_neta: {
              $subtract: ["$posible_ganancia", "$monto_apostado"]
            }
          }
        },
        {
          $group: {
            _id: "$usuario",
            nombre: { $first: "$usuario_info.nombre" },
            correo: { $first: "$usuario_info.correo" },
            ganancia_acumulada: { $sum: "$ganancia_neta" },
            apuestas_ganadas: { $sum: 1 },
            total_apostado: { $sum: "$monto_apostado" },
            total_ganado: { $sum: "$posible_ganancia" }
          }
        },
        {
          $sort: { ganancia_acumulada: -1 }
        },
        {
          $group: {
            _id: null,
            max_ganancia: { $max: "$ganancia_acumulada" },
            usuarios: { $push: "$$ROOT" }
          }
        },
        {
          $unwind: "$usuarios"
        },
        {
          $match: {
            $expr: { $eq: ["$usuarios.ganancia_acumulada", "$max_ganancia"] }
          }
        },
        {
          $replaceRoot: { newRoot: "$usuarios" }
        }
      ])
      .toArray();
    
    return resultado;
  };


export const actualizarSaldoUsuarioModel = async (idUsuario, ganancia) => {
    const db = await connection();
    const result =  await  db.collection("usuarios").updateOne(
        { _id: new ObjectId(idUsuario) },
        { $inc: { saldo: ganancia } }
    );

    return result;
};




export const deleteUsuarioModel = async (usuarioId, eliminarApuestas = false) => {
    const db = await connection();
    
    if (eliminarApuestas) {
      await db.collection("apuestas").deleteMany({ usuario: new ObjectId(usuarioId) });
    } else {
      const tieneApuestas = await db.collection("apuestas").countDocuments({ usuario: new ObjectId(usuarioId) });
      if (tieneApuestas) throw new Error("Usuario tiene apuestas. Use eliminarApuestas=true");
    }
    
    const result = await db.collection("usuarios").deleteOne({ _id: new ObjectId(usuarioId) });
    return result;
  };
  
  