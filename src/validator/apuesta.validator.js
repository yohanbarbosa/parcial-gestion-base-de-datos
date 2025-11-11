// src/validator/apuesta.validator.js
import { checkSchema } from "express-validator";

export const apuestaPost = checkSchema(
    {
      monto_apostado: {
        notEmpty: {
          errorMessage: "El monto apostado es requerido",
        },
        isFloat: {
          options: { min: 0 },
          errorMessage: "El monto apostado debe ser un número mayor o igual a 0",
        },
      },
      posible_ganancia: {
        notEmpty: {
          errorMessage: "La posible ganancia es requerida",
        },
        isFloat: {
          options: { min: 0 },
          errorMessage: "La posible ganancia debe ser un número mayor o igual a 0",
        },
      },
      estado: {
        notEmpty: {
          errorMessage: "El estado es requerido",
        },
        isIn: {
          options: [["ganada", "perdida", "en_curso", "cancelada"]],
          errorMessage: "Estado debe ser: ganada, perdida, en_curso o cancelada",
        },
      },
    },
    ["body.*"]
  );


