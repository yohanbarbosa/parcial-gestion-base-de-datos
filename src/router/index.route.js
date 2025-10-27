import { Router } from "express";
import TournametRoute from "./tournament.route.js";
import ApuestaRoute from "./apuesta.route.js";
import UsuarioRoute from "./usuario.route.js";
import EventoRoute from "./evento.route.js";
const router = Router();

router.use('/torneo',TournametRoute);
router.use('/apuesta' ,ApuestaRoute);
router.use('/usuario' ,UsuarioRoute);
router.use('/evento' ,EventoRoute);

export default router;