import { Router } from "express";
import Apuesta from "../controller/apuesta.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { apuestaPost, validateApuestaConsistency } from "../validator/apuesta.validator.js";


const router = Router();

router.get("/", Apuesta.getAllApuestas);
router.post("/",validate(apuestaPost),validateApuestaConsistency, Apuesta.postApuesta);

export default router;