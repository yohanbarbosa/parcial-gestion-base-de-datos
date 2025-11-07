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


export const actualizarSaldoUsuarioModel = async (idUsuario, ganancia) => {
    const db = await connection();
    const result =  await  db.collection("usuarios").updateOne(
        { _id: new ObjectId(idUsuario) },
        { $inc: { saldo: ganancia } }
    );

    return result;
};



// Modelo
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
  
  