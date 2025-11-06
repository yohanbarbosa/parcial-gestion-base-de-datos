import {
  postApuestaManyModel,
  postApuestaModel,
  getApuestaModel,
  getApuestaByEstadoModel,
} from "../model/apuesta.model.js";
import { ObjectId } from "mongodb";

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
      success :true,
      count:apuestas.length,
      data: apuestas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener las apuestas: " + error.message,
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

export default {
  getAllApuestas,
  getApuestaByEstado,
  postApuesta,
};
