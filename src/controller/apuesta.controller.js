import { postApuestaModel } from "../model/apuesta.model.js"
import { ObjectId } from "mongodb";

export const getApuesta = (req, res)=> {
    res.json({msg: "hola"})
}


export const postApuesta = async (req, res) =>{
    const info = req.body
    info.usuario = new ObjectId(info.usuario);
    info.evento = new ObjectId(info.evento);
    const result = await postApuestaModel(info);
    res.json({msg: "post apuesta", result})
} 


export default {
    getApuesta, 
    postApuesta
}