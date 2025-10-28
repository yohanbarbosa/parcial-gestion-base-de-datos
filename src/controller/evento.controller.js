import { getEventoModel, postEventoManyModel, postEventoModel , getEventosByDeporteModel } from "../model/evento.model.js";


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


export const getEventosByDeporte = async (req, res) => {
    try {
        const { deporte } = req.params;
        
        if (!deporte) {
            return res.status(400).json({
                success: false,
                message: "El parámetro 'deporte' es requerido"
            });
        }
        
        const eventos = await getEventosByDeporteModel(deporte);
        
        res.json({
            success: true,
            count: eventos.length,
            deporte: deporte,
            data: eventos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener eventos: ' + error.message
        });
    }
};


export default {
    getEventosByDeporte,
    getEvento, 
    postEvento
}