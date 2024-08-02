import Diagnostico from './diagnostico.model.js'

const mldDiagnostico = new Diagnostico()

async function getDiagnosticos() {
    try {
        const diagnosticos = await mldDiagnostico.findAll();
        console.log(diagnosticos)
        // return diagnosticos;

    } catch (error) {
        console.error('Error al consultar la tabla diagnostico:', error);
        throw error;
    }
}
getDiagnosticos();

