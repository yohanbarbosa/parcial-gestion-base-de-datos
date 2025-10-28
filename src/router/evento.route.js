import { Router } from "express";
import EventoController from "../controller/evento.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { eventoPost, validateEventoConsistency } from "../validator/evento.validator.js";
import eventoController from "../controller/evento.controller.js";


const router = Router();

router.get("/", EventoController.getEvento);
router.get("/deporte/:deporte", eventoController.getEventosByDeporte);
router.post("/", validate(eventoPost),validateEventoConsistency,EventoController.postEvento);

export default router;