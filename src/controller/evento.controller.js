import {
  getEventoModel,
  postEventoManyModel,
  postEventoModel,
  getEventosByDeporteModel,
  getEventosCuotaMayorModel,
  getEventoByIdModel,
  updateCuotaVisitanteModel,
  deleteEventoModel,
  getPromedioCuotasDeporteModel,
} from "../model/evento.model.js";

export const getEvento = async (req, res) => {
  const result = await getEventoModel();
  res.json({ msg: "hola evento", data: result });
};

export const postEvento = async (req, res) => {
  const info = req.body;
  const result = info.length
    ? await postEventoManyModel(info)
    : await postEventoModel(info);
  res.json({ msg: "post evento", result });
};

export const getEventosByDeporte = async (req, res) => {
  try {
    const { deporte } = req.params;

    if (!deporte) {
      return res.status(400).json({
        success: false,
        message: "El parámetro 'deporte' es requerido",
      });
    }

    const eventos = await getEventosByDeporteModel(deporte);

    res.json({
      success: true,
      count: eventos.length,
      deporte: deporte,
      data: eventos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener eventos: " + error.message,
    });
  }
};

export const getEventosCuotaMayor = async (req, res) => {
  try {
    const { cuota_local } = req.params;

    if (!cuota_local) {
      return res.status(400).json({
        success: false,
        message: "El parámetro 'cuota_local' es requerido",
      });
    } else if (cuota_local < 2.0) {
      return res.status(400).json({
        success: false,
        message: "El campo debe ser mayor a 2.0",
      });
    } else if (isNaN(cuota_local)) {
      return res.status(400).json({
        success: false,
        message: "El parámetro 'cuota_local' debe ser un numero",
      });
    }

    const eventos = await getEventosCuotaMayorModel(cuota_local);
    res.json({
      success: true,
      count: eventos.length,
      data: eventos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener eventos: " + error.message,
    });
  }
};

export const updateCuotaVisitante = async (req, res) => {
  try {
    const { idEvento } = req.params;
    const { nuevaCuota } = req.body;

    if (!idEvento) {
      return res.status(400).json({
        success: false,
        message: "El ID del evento es requerido",
      });
    }

    if (!nuevaCuota && nuevaCuota !== 0) {
      return res.status(400).json({
        success: false,
        message: "El parámetro 'nuevaCuota' es requerido",
      });
    }

    const cuotaNumero = parseFloat(nuevaCuota);

    if (
      isNaN(cuotaNumero) ||
      cuotaNumero < 1.0 ||
      cuotaNumero > 1000 ||
      !/^\d*\.?\d+$/.test(nuevaCuota.toString().trim())
    ) {
      return res.status(400).json({
        success: false,
        message:
          "La cuota debe ser un número entre 1.0 y 1000, sin caracteres especiales",
      });
    }

    const result = await updateCuotaVisitanteModel(idEvento, cuotaNumero);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Evento no encontrado",
      });
    }

    res.json({
      success: true,
      message: " Cuota visitante actualizada exitosamente",
      data: {
        evento_id: idEvento,
        cuota_visitante_actualizada: cuotaNumero,
        documentos_afectados: result.modifiedCount,
      },
    });
  } catch (error) {
    console.error(" Error en updateCuotaVisitante:", error.message);

    if (error.message.includes("ObjectId")) {
      return res.status(400).json({
        success: false,
        message: "ID de evento inválido",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error al actualizar cuota visitante: " + error.message,
    });
  }
};

export const deleteEvento = async (req, res) => {
  try {
    const { idEvento } = req.params;

    if (!idEvento) {
      return res.status(400).json({
        success: false,
        message: "El ID del evento es requerido",
      });
    }

    const evento = await getEventoByIdModel(idEvento);
    if (!evento) {
      return res.status(404).json({
        success: false,
        message: "Evento no encontrado",
      });
    }

    await deleteEventoModel(idEvento);
    return res.json({
      success: true,
      msg: "El evento ya no se encuentra entre nosotros ;v",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al borrar el evento visitante: " + error.message,
    });
  }
};

export const getPromedioCuotasDeporte = async (req, res) => {
  try {
    const resultado = await getPromedioCuotasDeporteModel();

    res.json({
      success: true,
      count: resultado.length,
      data: resultado,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al calcular promedios: " + error.message,
    });
  }
};

export default {
  getEventosByDeporte,
  getEventosCuotaMayor,
  getPromedioCuotasDeporte,
  getEvento,
  postEvento,
  updateCuotaVisitante,
  deleteEvento,
};
