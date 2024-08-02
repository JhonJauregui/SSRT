import { Router } from "express";
import {
    getDiagnosticoById,
    createDiagnostico
} from "./diagnostico.controller.js";

const router = Router();

//CREATE
router.post("/create", createDiagnostico);
//GET DIAGNOSTICO BY ID
router.get("/list/:id", getDiagnosticoById);

// VISTA
router.get("/", (req, res) => {
    res.render('diagnostico')
})

export default router;