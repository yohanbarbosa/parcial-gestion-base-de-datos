import { Router } from "express";
import { validate } from "../middleware/validator.middleware.js";
import { usuarioPost } from "../validator/usuario.validator.js";
import usuarioController from "../controller/usuario.controller.js";

const router = Router();

router.get("/", usuarioController.getUsuario);
router.get("/saldo/:saldo", usuarioController.getUsuariosBySaldo);
router.post("/",validate(usuarioPost) ,usuarioController.postUsuario);
router.delete("/eliminar/:idUsuario", usuarioController.deleteUsuario);

export default router;