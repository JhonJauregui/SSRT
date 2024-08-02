import CN_Diagnostico from "./diagnostico.negocio.js";

const objCapaNegocio = new CN_Diagnostico();

// CREATE - Capa de Presentación
export const createDiagnostico = async (req, res) => {
    try {
        const result = await objCapaNegocio.createDiagnostico(
            req
        );
        res.json(result);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Algo error ocurrio en CP: " + error.message });
    }
};

//GET DIAGNOSTICO BY ID
export const getDiagnosticoById = async (req, res) => {
    const ID_ = req.params.id

    try {
        const result = await objCapaNegocio.getDiagnosticoById(
            ID_
        );
        res.json(result);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Algo error ocurrio en CP: " + error.message });
    }
};