import CD_FormatoDiagnostico from "../formato_diagnostico/formato_diagnostico.datos.js"
import CD_Diagnostico from "./diagnostico.datos.js"
import DiagnosticoDto from "./diagnostico.dto.js"

const objCapaDato = new CD_Diagnostico()
const formatoDiagnosticoCD = new CD_FormatoDiagnostico()

class CN_Diagnostico {

    //CREATE
    async createDiagnostico(req) {
        let data = req.body
        let message = "success"
        const titulos = [
            "I. COMPROMISO E INVOLUCRAMIENTO",
            "II. POLITICA DE SEGURIDAD Y SALUD EN EL TRABAJO",
            "III. PLANEAMIENTO Y APLICACIÓN",
            "IV. IMPLEMENTACIÓN Y OPERACIÓN",
            "V. EVALUACIÓN DE NORMATIVA",
            "VI. VERIFICACIÓN",
            "VII. CONTROL DE INFORMACIÓN Y DOCUMENTOS",
            "VIII. REVISIÓN POR LA DIRECCIÓN",
        ]
        const contenido = [{
            lineamientos: "", indicador: "", cumplimientoI: "", calficacionI: "",
            observacion: "", cumplimientoF: "", calficacionF: ""
        }]

        if (Object.values(data).some(value => value === '')) {
            return { message: 'Datos requeridos' }
        }

        try {
            const diagnostico = await objCapaDato.createDiagnostico(data)
            if (diagnostico.message != "success") {
                return diagnostico
            }

            //REGISTRO DE LOS FORMATOS PARA DIAGNOSTICO
            const diagnostico_id = diagnostico.rows.insertId
            for (var i = 0; i < 8; i++) {
                let dataFormatoDiagnostico = {
                    titulo: titulos[i],
                    contenido,
                    diagnostico_id
                }
                const formatoDiagnostico = await formatoDiagnosticoCD.createFormatoDiagnostico(dataFormatoDiagnostico);
                if (formatoDiagnostico.message != "success") {
                    return formatoDiagnostico
                }
            }
        } catch (error) {
            message = "Algo salió mal en CN: " + error.message;
            return { message };
        }
        return { message }
    }

    //GET DIAGNOSTICO BY ID
    async getDiagnosticoById(id) {
        const result = await objCapaDato.getDiagnosticoById(id)
        var objDto = new DiagnosticoDto(result.rows)
        result.rows = objDto.getData()
        return result
    }
}

export default CN_Diagnostico