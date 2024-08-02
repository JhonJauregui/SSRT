import CN_FormatoDiagnostico from "./formato_diagnostico.negocio.js";

const objCapaNegocio = new CN_FormatoDiagnostico();

// CREATE - Capa de Presentación
export const createFormatoDiagnostico = async (req, res) => {
    try {
        const result = await objCapaNegocio.createFormatoDiagnostico(
            req
        );
        res.json(result);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Algo error ocurrio en CP: " + error.message });
    }
};

//GET FORMATO DIAGNOSTICO BY ID
export const getFormatoDiagnosticoById = async (req, res) => {
    const ID_ = req.params.id

    try {
        const result = await objCapaNegocio.getFormatoDiagnosticoById(
            ID_
        );
        res.json(result);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Algo error ocurrio en CP: " + error.message });
    }
};