// import helpers from "../helpers.js";

// const objHelpers = new helpers();
class DiagnosticoDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                // const fecha
                return {
                    "FECHA REVISIÓN": data.fecha_registro,
                    "INSPECTOR": data.diagnostico_inspector,
                    "NUMERO REVISIÓN": data.diagnostico_revision,
                    "OPCIONES": data.diagnostico_id
                };
            });
        } else {
            return []
        }
    }
}

export default DiagnosticoDto;