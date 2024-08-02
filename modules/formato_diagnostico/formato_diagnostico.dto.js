// import helpers from "../helpers.js";

// const objHelpers = new helpers();
class FormatoDiagnosticoDto {

    constructor(datos) {
        this.datos = datos
    }

    getData() {
        if (this.datos.length > 0) {
            return this.datos.map(data => {
                const contenidoJson = data.contenido ? JSON.parse(data.contenido) : ''
                return {
                    "id": data.id,
                    "titulo": data.titulo,
                    "contenido": contenidoJson,
                    "diagnostico_id": data.diagnostico_id,
                };
            });
        } else {
            return []
        }
    }
}

export default FormatoDiagnosticoDto;