import {
  getUsuarioModel,
  postUsuarioModel,
  postUsuarioManyModel,
  getUsuariosBySaldoModel,
  deleteUsuarioModel,
  getUsuarioMayorGananciaModel,
} from "../model/usuario.model.js";

export const getUsuario = async (_, res) => {
  const result = await getUsuarioModel();
  res.json({ msg: "hola Usuario", data: result });
};

export const postUsuario = async (req, res) => {
  const info = req.body;
  const result = info.length
    ? await postUsuarioManyModel(info)
    : await postUsuarioModel(info);
  res.json({ msg: "post Usuario", result });
};

export const getUsuariosBySaldo = async (req, res) => {
  try {
    const { saldo } = req.params;

    if (!saldo || isNaN(saldo) || saldo < 0) {
      return res.status(400).json({
        success: false,
        message: "El parámetro 'saldo' debe ser un número válido",
      });
    }

    const usuarios = await getUsuariosBySaldoModel(saldo);

    res.json({
      success: true,
      count: usuarios.length,
      saldo: parseFloat(saldo),
      data: usuarios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener usuarios: " + error.message,
    });
  }
};

export const getUsuarioMayorGanancia = async (req, res) => {
  try {
    const resultado = await getUsuarioMayorGananciaModel();
    
    const maxGanancia = resultado.length > 0 ? resultado[0].ganancia_acumulada : 0;
    
    res.json({
      success: true,
      count: resultado.length,
      max_ganancia: maxGanancia,
      data: resultado
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al calcular ganancias: " + error.message
    });
  }
};


export const deleteUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { eliminarApuestas } = req.query;

    const result = await deleteUsuarioModel(
      idUsuario,
      eliminarApuestas === "true"
    );

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({
      success: true,
      message: eliminarApuestas
        ? "Usuario y apuestas eliminados"
        : "Usuario eliminado",
    });
  } catch (error) {
    if (error.message.includes("tiene apuestas")) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res
      .status(500)
      .json({ success: false, message: "Error al eliminar usuario" });
  }
};

export default {
  getUsuariosBySaldo,
  getUsuario,
  postUsuario,
  deleteUsuario,
  getUsuarioMayorGanancia,
};
