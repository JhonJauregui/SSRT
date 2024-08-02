import CD_FormatoDiagnostico from "./formato_diagnostico.datos.js";
import FormatoDiagnosticoDto from "./formato_diagnostico.dto.js";

const objCapaDato = new CD_FormatoDiagnostico();

class CN_FormatoDiagnostico {

    //CREATE
    async createFormatoDiagnostico(req) {
        let data = req.body;

        if (Object.values(data).some(value => value === '')) {
            return { message: 'Datos requeridos' }
        }
        return await objCapaDato.createFormatoDiagnostico(data);
    }

    //GET FORMATO DIAGNOSTICO BY ID
    async getFormatoDiagnosticoById(id) {
        const result = await objCapaDato.getFormatoDiagnosticoById(id)
        var objDto = new FormatoDiagnosticoDto(result.rows);
        result.rows = objDto.getData();
        return result;
    }
}

export default CN_FormatoDiagnostico;