import { getUsuarioModel , postUsuarioModel, postUsuarioManyModel, getUsuariosBySaldoModel } from "../model/usuario.model.js";

export const getUsuario = async ( _ , res)=> {
    const result = await getUsuarioModel();
    res.json({msg: "hola Usuario", data: result})
}


export const postUsuario = async (req, res) =>{
    const info = req.body;
    const result = (info.length) ? 
    await postUsuarioManyModel(info) :
    await postUsuarioModel(info)
    res.json({msg: "post Usuario", result})
} 


export const getUsuariosBySaldo = async (req, res) => {
    try {
        const { saldo } = req.params;
        
        if (!saldo || isNaN(saldo) || saldo < 0) {
            return res.status(400).json({
                success: false,
                message: "El parámetro 'saldo' debe ser un número válido"
            });
        }
        
        const usuarios = await getUsuariosBySaldoModel(saldo);
        
        res.json({
            success: true,
            count: usuarios.length,
            saldo: parseFloat(saldo),
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios: ' + error.message
        });
    }
};
 

export default {
    getUsuariosBySaldo,
    getUsuario, 
    postUsuario
}