import { Router } from "express";
import { validate } from "../middleware/validator.middleware.js";
import { usuarioPost } from "../validator/usuario.validator.js";
import usuarioController from "../controller/usuario.controller.js";

const router = Router();

router.get("/", usuarioController.getUsuario);
router.get("/saldo/:saldo", usuarioController.getUsuariosBySaldo);
router.get("/mayorGanancia", usuarioController.getUsuarioMayorGanancia);
router.post("/", (req, res, next) => {
    if (!Array.isArray(req.body)) {
      req.body = [req.body];
    }
    next();
  }, validate(usuarioPost), usuarioController.postUsuario);
  
router.delete("/eliminar/:idUsuario", usuarioController.deleteUsuario);

export default router;