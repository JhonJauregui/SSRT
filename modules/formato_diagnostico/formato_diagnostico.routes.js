import { Router } from "express";
import { getFormatoDiagnosticoById, createFormatoDiagnostico } from "./formato_diagnostico.controller.js";

const router = Router();

//CREATE
router.post("/create", createFormatoDiagnostico);
//GET FORMATO DIAGNOSTICO BY ID
router.get("/list/:id", getFormatoDiagnosticoById);

// VISTA
router.get("/", (req, res) => {
    res.render('diagnostico')
})

export default router;