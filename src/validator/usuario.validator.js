import { checkSchema } from "express-validator";

export const usuarioPost = checkSchema({
    nombre: {
        notEmpty: {
            errorMessage: 'El nombre no puede estar vacío'
        },
        isLength: {
            options: { min: 3, max: 100 },
            errorMessage: 'El nombre debe tener entre 3 y 100 caracteres'
        },
        isString: {
            errorMessage: 'El nombre debe ser texto'
        }
    },
    correo: {
        isEmail: {
            errorMessage: 'El correo no es válido'
        },
        notEmpty: {
            errorMessage: 'El correo no puede estar vacío'
        }
    },
    saldo: {
        notEmpty: {
            errorMessage: 'El saldo no puede estar vacío'
        },
        isFloat: {
            options: { min: 0 },
            errorMessage: 'El saldo debe ser un número positivo'
        }
    },
    país: {
        notEmpty: {
            errorMessage: 'El país no puede estar vacío'
        },
        isLength: {
            options: { min: 2, max: 50 },
            errorMessage: 'El país debe tener entre 2 y 50 caracteres'
        }
    }
}, ["body"]); // ← Esto significa "solo validar el body"