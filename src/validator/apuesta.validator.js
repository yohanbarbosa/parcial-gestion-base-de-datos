// src/validator/apuesta.validator.js
import { checkSchema } from "express-validator";
import { ObjectId } from "mongodb";

export const apuestaPost = checkSchema({
    monto_apostado: {
        notEmpty: {
            errorMessage: 'El monto apostado es requerido'
        },
        isFloat: {
            options: { min: 0.01, max: 10000 },
            errorMessage: 'El monto apostado debe ser un número entre 0.01 y 10,000'
        },
        toFloat: true
    },
    posible_ganancia: {
        notEmpty: {
            errorMessage: 'La posible ganancia es requerida'
        },
        isFloat: {
            options: { min: 0.01, max: 100000 },
            errorMessage: 'La posible ganancia debe ser un número entre 0.01 y 100,000'
        },
        toFloat: true,
        custom: {
            options: (value, { req }) => {
                const monto = parseFloat(req.body.monto_apostado);
                const ganancia = parseFloat(value);
                
                if (ganancia <= monto) {
                    throw new Error('La posible ganancia debe ser mayor al monto apostado');
                }
                return true;
            }
        }
    },
    estado: {
        notEmpty: {
            errorMessage: 'El estado es requerido'
        },
        isIn: {
            options: [['ganada', 'perdida', 'en_curso', 'cancelada']],
            errorMessage: 'Estado debe ser: ganada, perdida, en_curso o cancelada'
        }
    },
    tipo_apuesta: {
        notEmpty: {
            errorMessage: 'El tipo de apuesta es requerido'
        },
        isIn: {
            options: [['local', 'visitante', 'empate', 'ganador', 'pole']],
            errorMessage: 'Tipo de apuesta debe ser: local, visitante, empate, ganador o pole'
        }
    },
    cuota_seleccionada: {
        notEmpty: {
            errorMessage: 'La cuota seleccionada es requerida'
        },
        isFloat: {
            options: { min: 1.01, max: 100 },
            errorMessage: 'La cuota seleccionada debe ser un número entre 1.01 y 100'
        },
        toFloat: true,
        custom: {
            options: (value, { req }) => {
                const monto = parseFloat(req.body.monto_apostado);
                const ganancia = parseFloat(req.body.posible_ganancia);
                const cuota = parseFloat(value);
                
                const gananciaCalculada = monto * cuota;
                const tolerancia = 0.01; // Tolerancia por decimales
                
                if (Math.abs(gananciaCalculada - ganancia) > tolerancia) {
                    throw new Error(`La posible ganancia (${ganancia}) no coincide con monto (${monto}) × cuota (${cuota}) = ${gananciaCalculada}`);
                }
                return true;
            }
        }
    },
    fecha_apuesta: {
        optional: true,
        isISO8601: {
            errorMessage: 'La fecha de apuesta debe tener formato ISO 8601'
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
        
        // Aquí podrías verificar en la base de datos que:
        // 1. El evento_id existe
        // 2. El tipo_apuesta es válido para ese deporte
        // 3. El evento está en estado "pendiente"
        
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