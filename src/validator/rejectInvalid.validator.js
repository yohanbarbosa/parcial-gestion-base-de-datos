export const rejectInvalidEvento = (req, res, next) => {
    const eventos = Array.isArray(req.body) ? req.body : [req.body];
  
    const camposObligatorios = ["deporte", "fecha", "equipo_local", "equipo_visitante", "cuota_local", "cuota_empate", "cuota_visitante"];
  

    for (const evento of eventos) {
      
      if (!evento || Object.keys(evento).length === 0) {
        return res.status(400).json({
          error: "No se permite insertar eventos vacíos."
        });
      }
  
    
      const faltantes = camposObligatorios.filter(campo => !evento[campo]);
      if (faltantes.length > 0) {
        return res.status(400).json({
          error: "Faltan campos obligatorios",
          faltantes
        });
      }
    }
  
    next();
  };
  