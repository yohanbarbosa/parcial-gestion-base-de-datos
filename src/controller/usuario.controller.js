import { getUsuarioModel , postUsuarioModel, postUsuarioManyModel } from "../model/usuario.model.js";

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


export default {
    getUsuario, 
    postUsuario
}