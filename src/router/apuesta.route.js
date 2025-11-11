import { Router } from "express";
import ApuestaController from "../controller/apuesta.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { apuestaPost } from "../validator/apuesta.validator.js";

const router = Router();

router.get("/", ApuestaController.getAllApuestas);
router.get("/estado/:estado", ApuestaController.getApuestaByEstado);
router.get("/baloncesto/", ApuestaController.getApuestaByBaloncesto);
router.get("/totalApuestas/", ApuestaController.getTotalApuestaUsuario);
router.get("/apuestaCompleta/", ApuestaController.getApuestasCompletas);
router.put(
  "/actualizarEstado/:idApuesta",
  ApuestaController.updateEstadoApuesta
);
router.post(
  "/",
  (req, res, next) => {
    if (!Array.isArray(req.body)) {
      req.body = [req.body];
    }
    next();
  },
  validate(apuestaPost),
  ApuestaController.postApuesta
);

export default router;
