import { validationResult } from "express-validator";

export { validationResult };

export const validate = (validations) => async (req, res, next) => {
    
    // 1. Ejecutar todas las validaciones
    await Promise.all(
        validations.map((validation) => validation.run(req))
    );

    // 2. Obtener resultados de validación
    const errors = validationResult(req);

    // 3. Verificar si hay errores (CORRECCIÓN: isEmpty() no isEmpety())
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: errors.array()
        });
    }

    // 4. Si no hay errores, continuar
    next();
};