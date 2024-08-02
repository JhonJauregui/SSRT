import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

let dataEmpresaRedes = {
    headings: [
        "FECHA REVISIÓN",
        "INSPECTOR",
        "NUMERO REVISIÓN",
        "OPCIONES"
    ],
};

var opciones = {
    searchable: true,
    data: dataEmpresaRedes,
    columns: [
        {
            select: 3,
            render: function (data, td, id, cellIndex) {
                if (data.length !== 0) {
                    return `<button type='button' class='btn btn-warning btn-sm btn-editar' data-row='${data[0].data}'><i class='fas fa-edit'></i></button>
                    <button type='button' class='btn btn-danger btn-sm ms-2 btn-eliminar' data-row='${data[0].data}'><i class='fas fa-trash'></i></button>
                    `;
                }
            },
        },
    ],
};

$(document).ready(function () {
    var tabla_diagnostico;

    if (simpleDatatables) {
        tabla_diagnostico = new simpleDatatables.DataTable(
            "#tablaDiagnostico",
            opciones,
        );
    }

    (async () => {
        debugger
        if (!tabla_diagnostico) return

        let ruta = "diagnostico/list/ID"
        const jsonData = await objUtilidades.fetchResultListar(ruta);

        if (jsonData.message == "success") {
            tabla_diagnostico.insert(jsonData.rows);
        } else {
            Swal.fire({
                title: "Error",
                text: "Algo salio mal al cargar la información",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    })();

    $("#btn-crear").on("click", async function () {
        let ruta = "diagnostico/create";
        const jsonData = await objUtilidades.fetchResultGuardar(ruta, { "data": "data" });

        if (jsonData.message == "success") {
            // console.log(jsonData)
            window.location.href = '/';
        } else {
            Swal.fire({
                title: "Error",
                text: "Algo salio mal al cargar la información",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    })

})
