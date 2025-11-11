import { checkSchema } from "express-validator";

export const usuarioPost = checkSchema({
    "*.nombre": {
      notEmpty: {
        errorMessage: "El nombre no puede estar vacío"
      },
      isLength: {
        options: { min: 3, max: 100 },
        errorMessage: "El nombre debe tener entre 3 y 100 caracteres"
      },
      trim: true,
      escape: true
    },
    "*.correo": {
      isEmail: {
        errorMessage: "El correo no es válido"
      },
      notEmpty: {
        errorMessage: "El correo no puede estar vacío"
      },
      normalizeEmail: {
        options: {
          all_lowercase: true,
          gmail_remove_dots: false
        }
      }
    },
    "*.saldo": {
      notEmpty: {
        errorMessage: "El saldo no puede estar vacío"
      },
      isFloat: {
        options: { min: 0, max: 1000000 },
        errorMessage: "El saldo debe ser un número positivo entre 0 y 1,000,000"
      },
      toFloat: true
    },
    "*.pais": {
      notEmpty: {
        errorMessage: "El país no puede estar vacío"
      },
      isLength: {
        options: { min: 2, max: 50 },
        errorMessage: "El país debe tener entre 2 y 50 caracteres"
      },
      trim: true,
      escape: true
    }
  }, ["body"]);
  