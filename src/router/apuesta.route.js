import { Router } from "express";
import ApuestaController from "../controller/apuesta.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { apuestaPost, validateApuestaConsistency } from "../validator/apuesta.validator.js";


const router = Router();

router.get("/", ApuestaController.getAllApuestas);
router.get("/estado/:estado", ApuestaController.getApuestaByEstado);
router.get("/baloncesto/", ApuestaController.getApuestaByBaloncesto);
router.put("/actualizarEstado/:idApuesta", ApuestaController.updateEstadoApuesta);
router.post("/",validate(apuestaPost),validateApuestaConsistency, ApuestaController.postApuesta);

export default router;