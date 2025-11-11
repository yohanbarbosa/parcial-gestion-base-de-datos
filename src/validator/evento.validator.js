import { checkSchema } from "express-validator";

export const eventoPost = checkSchema({

    deporte: {
        notEmpty: {
            errorMessage: 'El deporte es requerido'
        },
        isIn: {
            options: [['Fútbol', 'Baloncesto', 'Beisbol']],
            errorMessage: 'El deporte debe ser uno de: Fútbol, Baloncesto, Beisbol'
        },
        trim: true
    },

    fecha: {
        notEmpty: {
            errorMessage: 'La fecha es requerida'
        },
        custom: {
            options: (value) => {
                // Validar formato YYYY-MM-DD (con o sin hora posterior)
                const regex = /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2})?$/;
                if (!regex.test(value)) {
                    throw new Error('La fecha debe tener el formato: YYYY-MM-DD o YYYY-MM-DD HH:mm:ss');
                }

                const fechaEvento = new Date(value);
                const ahora = new Date();
                if (isNaN(fechaEvento.getTime())) {
                    throw new Error('Fecha inválida');
                }
                if (fechaEvento <= ahora) {
                    throw new Error('La fecha del evento debe ser futura');
                }
                return true;
            }
        }
    },

    equipo_local: {
        custom: {
            options: (value, { req }) => {
                if (['Fútbol', 'Baloncesto', 'Beisbol'].includes(req.body.deporte) && !value) {
                    throw new Error('El equipo local es requerido para deportes de equipo');
                }
                return true;
            }
        },
        trim: true
    },

    equipo_visitante: {
        custom: {
            options: (value, { req }) => {
                if (['Fútbol', 'Baloncesto', 'Beisbol'].includes(req.body.deporte) && !value) {
                    throw new Error('El equipo visitante es requerido para deportes de equipo');
                }
                return true;
            }
        },
        trim: true
    },

    cuota_local: {
        optional: true,
        isFloat: {
            options: { min: 1.01, max: 100 },
            errorMessage: 'La cuota local debe ser un número entre 1.01 y 100'
        }
    },

    cuota_empate: {
        optional: true,
        isFloat: {
            options: { min: 1.01, max: 100 },
            errorMessage: 'La cuota empate debe ser un número entre 1.01 y 100'
        }
    },

    cuota_visitante: {
        optional: true,
        isFloat: {
            options: { min: 1.01, max: 100 },
            errorMessage: 'La cuota visitante debe ser un número entre 1.01 y 100'
        }
    }

},["body.*"]);




export const validateEventoConsistency = (req, res, next) => {
    const { deporte, equipo_local, equipo_visitante, jugador_local, jugador_visitante, evento } = req.body;
    
  
    if (['Fútbol', 'Baloncesto', 'Béisbol'].includes(deporte)) {
        if (!equipo_local || !equipo_visitante) {
            return res.status(400).json({
                success: false,
                message: `Para ${deporte} se requieren equipo_local y equipo_visitante`
            });
        }
    }
    
    
    next();
};