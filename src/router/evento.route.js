import { Router } from "express";
import Evento from "../controller/evento.controller.js";

const router = Router();

router.get("/", Evento.getEvento);
router.post("/", Evento.postEvento);

export default router;