// src/validator/evento.validator.js
import { checkSchema } from "express-validator";

export const eventoPost = checkSchema({
    deporte: {
        notEmpty: {
            errorMessage: 'El deporte es requerido'
        },
        isIn: {
            options: [['Fútbol', 'Baloncesto', 'Tenis', 'Béisbol', 'Boxeo', 'Fórmula 1']],
            errorMessage: 'Deporte debe ser: Fútbol, Baloncesto, Tenis, Béisbol, Boxeo o Fórmula 1'
        },
        trim: true
    },
    fecha: {
        notEmpty: {
            errorMessage: 'La fecha es requerida'
        },
        isISO8601: {
            errorMessage: 'La fecha debe tener formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)'
        },
        custom: {
            options: (value) => {
                const fechaEvento = new Date(value);
                const ahora = new Date();
                if (fechaEvento <= ahora) {
                    throw new Error('La fecha del evento debe ser futura');
                }
                return true;
            }
        }
    },
    // Para deportes de equipo
    equipo_local: {
        optional: true,
        notEmpty: {
            errorMessage: 'El equipo local es requerido para deportes de equipo'
        },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El equipo local debe tener entre 2 y 50 caracteres'
        },
        trim: true
    },
    equipo_visitante: {
        optional: true,
        notEmpty: {
            errorMessage: 'El equipo visitante es requerido para deportes de equipo'
        },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El equipo visitante debe tener entre 2 y 50 caracteres'
        },
        trim: true
    },
    // Para deportes individuales
    jugador_local: {
        optional: true,
        notEmpty: {
            errorMessage: 'El jugador local es requerido para deportes individuales'
        },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El jugador local debe tener entre 2 y 50 caracteres'
        },
        trim: true
    },
    jugador_visitante: {
        optional: true,
        notEmpty: {
            errorMessage: 'El jugador visitante es requerido para deportes individuales'
        },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El jugador visitante debe tener entre 2 y 50 caracteres'
        },
        trim: true
    },
    // Cuotas según el deporte
    cuota_local: {
        optional: true,
        isFloat: {
            options: { min: 1.01, max: 100 },
            errorMessage: 'La cuota local debe ser un número entre 1.01 y 100'
        },
        toFloat: true
    },
    cuota_empate: {
        optional: true,
        isFloat: {
            options: { min: 1.01, max: 100 },
            errorMessage: 'La cuota empate debe ser un número entre 1.01 y 100'
        },
        toFloat: true
    },
    cuota_visitante: {
        optional: true,
        isFloat: {
            options: { min: 1.01, max: 100 },
            errorMessage: 'La cuota visitante debe ser un número entre 1.01 y 100'
        },
        toFloat: true
    },
    // Validación condicional para Fórmula 1
    evento: {
        optional: true,
        isLength: {
            options: { min: 5, max: 100 },
            errorMessage: 'El nombre del evento debe tener entre 5 y 100 caracteres'
        },
        trim: true
    },
    piloto_favorito: {
        optional: true,
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El piloto favorito debe tener entre 2 y 50 caracteres'
        },
        trim: true
    },
    cuota_ganador: {
        optional: true,
        isFloat: {
            options: { min: 1.01, max: 100 },
            errorMessage: 'La cuota ganador debe ser un número entre 1.01 y 100'
        },
        toFloat: true
    },
    estado: {
        optional: true,
        isIn: {
            options: [['pendiente', 'en_curso', 'finalizado', 'cancelado']],
            errorMessage: 'Estado debe ser: pendiente, en_curso, finalizado o cancelado'
        },
        default: {
            options: 'pendiente'
        }
    }
}, ["body"]);

// Validador personalizado para verificar consistencia de datos
export const validateEventoConsistency = (req, res, next) => {
    const { deporte, equipo_local, equipo_visitante, jugador_local, jugador_visitante, evento } = req.body;
    
    // Validar que deportes de equipo tengan equipos
    if (['Fútbol', 'Baloncesto', 'Béisbol'].includes(deporte)) {
        if (!equipo_local || !equipo_visitante) {
            return res.status(400).json({
                success: false,
                message: `Para ${deporte} se requieren equipo_local y equipo_visitante`
            });
        }
    }
    
    // Validar que deportes individuales tengan jugadores
    if (['Tenis', 'Boxeo'].includes(deporte)) {
        if (!jugador_local || !jugador_visitante) {
            return res.status(400).json({
                success: false,
                message: `Para ${deporte} se requieren jugador_local y jugador_visitante`
            });
        }
    }
    
    // Validar Fórmula 1
    if (deporte === 'Fórmula 1') {
        if (!evento) {
            return res.status(400).json({
                success: false,
                message: 'Para Fórmula 1 se requiere el nombre del evento'
            });
        }
    }
    
    next();
};