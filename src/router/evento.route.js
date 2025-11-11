import { Router } from "express";
import EventoController from "../controller/evento.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import {
  eventoPost,
  validateEventoConsistency,
} from "../validator/evento.validator.js";
import eventoController from "../controller/evento.controller.js";
import {rejectInvalidEvento} from "../validator/rejectInvalid.validator.js";

const router = Router();

router.get("/", EventoController.getEvento);
router.get("/deporte/:deporte", eventoController.getEventosByDeporte);
router.get("/cuota_local/:cuota_local", eventoController.getEventosCuotaMayor);
router.get("/promedioCuotaDeporte", eventoController.getPromedioCuotasDeporte);
router.delete("/borrar/:idEvento", eventoController.deleteEvento);
router.put(
  "/modificar_cuota_visitante/:idEvento",
  eventoController.updateCuotaVisitante
);
router.post(
  "/",
  (req, res, next) => {
    if (!Array.isArray(req.body)) {
      req.body = [req.body];
    }
    next();
  },
  rejectInvalidEvento,
  validate(eventoPost),
  validateEventoConsistency,
  EventoController.postEvento
);

export default router;
