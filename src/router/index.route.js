import { Router } from "express";
import TournametRoute from "./tournament.route.js";
import ApuestaRoute from "./apuesta.route.js";
import UsuarioRoute from "./usuario.route.js";
import EventoRoute from "./evento.route.js";
const router = Router();

router.use(TournametRoute);
router.use('/apuestas' ,ApuestaRoute);
router.use('/usuarios' ,UsuarioRoute);
router.use('/eventos' ,EventoRoute);

export default router;