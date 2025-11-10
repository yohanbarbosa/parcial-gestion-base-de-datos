import {
  postApuestaManyModel,
  postApuestaModel,
  getApuestaModel,
  getApuestaByEstadoModel,
  getApuestaByBaloncestoModel,
  getApuestaByIdModel,
  updateEstadoApuestaModel,
  getTotalApuestaUsuarioModel,
  getApuestasCompletasModel,
} from "../model/apuesta.model.js";
import { ObjectId } from "mongodb";
import { actualizarSaldoUsuarioModel } from "../model/usuario.model.js";

export const getAllApuestas = async (req, res) => {
  try {
    const apuestas = await getApuestaModel();

    res.json({
      success: true,
      count: apuestas.length,
      data: apuestas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener apuestas: " + error.message,
    });
  }
};

export const getApuestaByEstado = async (req, res) => {
  try {
    const { estado } = req.params;
    if (!estado) {
      res.status(400).json({
        success: false,
        msg: "El campo 'estado' no es soportado",
      });
    }
    const apuestas = await getApuestaByEstadoModel(estado);

    res.json({
      success: true,
      count: apuestas.length,
      data: apuestas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las apuestas: " + error.message,
    });
  }
};

export const getApuestaByBaloncesto = async (req, res) => {
  try {
    const apuestas = await getApuestaByBaloncestoModel();
    res.json({
      success: true,
      count: apuestas.length,
      data: apuestas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las apuestas: " + error.message,
    });
  }
};

export const getTotalApuestaUsuario = async (req, res) => {
  try {
    const resultado = await getTotalApuestaUsuarioModel();

    res.json({
      success: true,
      count: resultado.length,
      data: resultado,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al calcular total apostado: " + error.message,
    });
  }
};

export const postApuesta = async (req, res) => {
  try {
    const info = req.body;

    if (Array.isArray(info)) {
      console.log(`Recibiendo ${info.length} apuestas`);

      const apuestasConvertidas = info.map((apuesta) => ({
        ...apuesta,
        usuario: new ObjectId(apuesta.usuario),
        evento: new ObjectId(apuesta.evento),
      }));

      const result = await postApuestaManyModel(apuestasConvertidas);

      res.json({
        success: true,
        msg: `${result.insertedCount} apuestas creadas exitosamente`,
        result,
      });
    } else {
      console.log("Recibiendo 1 apuesta individual");

      // Convertir IDs del objeto individual
      const apuestaConvertida = {
        ...info,
        usuario: new ObjectId(info.usuario),
        evento: new ObjectId(info.evento),
      };

      const result = await postApuestaModel(apuestaConvertida);

      res.json({
        success: true,
        msg: "Apuesta creada exitosamente",
        result,
      });
    }
  } catch (error) {
    console.error("❌ Error en postApuesta:", error.message);

    // Manejar errores de ObjectId inválido
    if (error.message.includes("ObjectId")) {
      return res.status(400).json({
        success: false,
        message: "ID de usuario o evento inválido",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error al crear apuesta: " + error.message,
    });
  }
};

export const updateEstadoApuesta = async (req, res) => {
  try {
    const { idApuesta } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ error: "Ingrese un valor" });
    }

    const apuesta = await getApuestaByIdModel(idApuesta);

    if (!apuesta) {
      return res.status(404).json({ error: "Apuesta no encontrada" });
    }

    const estadosValidos = ["ganada", "en_curso", "perdida", "cancelada"];

    if (!estadosValidos.includes(estado)) {
      return res.json({
        success: false,
        msg: `Estado '${estado}' no válido. Estados permitidos: ${estadosValidos.join(
          ", "
        )}`,
      });
    }

    if (estado === "ganada") {
      //  traer datos
      const usuario = apuesta.usuario;
      const ganancia = apuesta.posible_ganancia;

      //  Actualizar saldo
      await actualizarSaldoUsuarioModel(usuario, ganancia);
    }

    //  Actualizar estado de la apuesta
    await updateEstadoApuestaModel(idApuesta, estado);

    res.json({ mensaje: `Saldo actualizado y apuesta marcada como ${estado}` });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener la apuesta: " + error.message,
    });
  }
};


export const getApuestasCompletas = async (req, res) => {
  try {
    const resultado = await getApuestasCompletasModel();
    
    res.json({
      success: true,
      count: resultado.length,
      data: resultado
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener apuestas completas: " + error.message
    });
  }
};


export default {
  getAllApuestas,
  getApuestaByEstado,
  postApuesta,
  getApuestaByBaloncesto,
  updateEstadoApuesta,
  getTotalApuestaUsuario,
  getApuestasCompletas,
};
