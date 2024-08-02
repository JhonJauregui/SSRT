import { Router } from "express";
import formato_diagnostico from "./formato_diagnostico/formato_diagnostico.routes.js";
import diagnostico from "./diagnostico/diagnostico.routes.js";

const router = Router();

router.use("/diagnostico", diagnostico);
router.use("/formato_diagnostico", formato_diagnostico);

router.get("/", (req, res) => {
    res.render('prueba', { layout: false })
})

export default router;