// src/validator/apuesta.validator.js
import { checkSchema } from "express-validator";


export const apuestaPost = checkSchema({

    estado: {
        notEmpty: {
            errorMessage: 'El estado es requerido'
        },
        isIn: {
            options: [['ganada', 'perdida', 'en_curso', 'cancelada']],
            errorMessage: 'Estado debe ser: ganada, perdida, en_curso o cancelada'
        }
    },
    fecha_apuesta: {
        optional: true,
        isISO8601: {
            errorMessage: 'La fecha de apuesta debe tener el formato año-mes-dia, ejemplo: 2025-12-07'
        },
        custom: {
            options: (value) => {
                if (value) {
                    const fechaApuesta = new Date(value);
                    const ahora = new Date();
                    if (fechaApuesta > ahora) {
                        throw new Error('La fecha de apuesta no puede ser futura');
                    }
                }
                return true;
            }
        }
    }
}, ["body"]);

// Validador para verificar consistencia de apuesta con evento
export const validateApuestaConsistency = async (req, res, next) => {
    try {
        const { tipo_apuesta, evento_id } = req.body;
        

        
        // Por ahora solo validación básica
        if (tipo_apuesta === 'empate') {
            // Verificar que el evento permita empates (fútbol)
            // Esto requeriría consultar la base de datos
        }
        
        if (tipo_apuesta === 'pole' && !req.body.deporte === 'Fórmula 1') {
            return res.status(400).json({
                success: false,
                message: 'El tipo "pole" solo es válido para Fórmula 1'
            });
        }
        
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error validando consistencia de apuesta'
        });
    }
};