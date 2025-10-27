import { getEventoModel, postEventoManyModel, postEventoModel } from "../model/evento.model.js";


export const getEvento = async (req, res)=> {
    const result = await getEventoModel();
    res.json({msg: "hola evento", data: result})
}


export const postEvento = async (req, res) =>{
    const info = req.body;
    const result = (info.length) ? 
    await postEventoManyModel(info) :
    await postEventoModel(info)
    res.json({msg: "post evento", result})
} 


export default {
    getEvento, 
    postEvento
}