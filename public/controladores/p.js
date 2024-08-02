import Utilidades from "../peticiones/utilidades.js";

const objUtilidades = new Utilidades();

var tableData = [
    {
        lineamientos: "Principios",
        indicador: "El empleador proporciona los recursos necesarios para que se implemente un sistema de gestión de seguridad y salud en el trabajo.",
        cumplimientoI: "SI",
        calficacionI: 2,
        observacion: "",
        cumplimientoF: "SI",
        calficacionF: 4
    },
    {
        lineamientos: "", indicador: "", cumplimientoI: "", calficacionI: "",
        observacion: "", cumplimientoF: "", calficacionF: ""
    },
];

// Configuraciones especificas
const cumplimiento_opc = {
    values: {
        "SI": "SI",
        "NO": "NO"
    }
}

const calificaion_opc = {
    values: {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4
    }
}

var fun_cumplimiento = function (cell, formatterParams) {
    const value = cell.getValue();
    const element = cell.getElement();
    element.classList.remove("green-cell", "red-cell");

    if (value === "SI") {
        element.classList.add("green-cell");
    } else if (value === "NO") {
        element.classList.add("red-cell");
    }

    return value;
}

var fun_calificaion = function (cell) {
    let value = cell.getValue();
    if (!isNaN(value)) {
        cell.setValue(Number(value));
    }
}

// Configuracion general
let opciones =
{
    // layout: "fitDataFill",
    // rowHeader: { formatter: "rownum", headerSort: false, hozAlign: "center", resizable: false, frozen: true },
    reactiveData: true,
    data: tableData,
    columns: [
        { title: "LINEAMIENTOS", field: "lineamientos", editor: "input", hozAlign: "center" },
        { title: "INDICADOR", field: "indicador", editor: "input", formatter: "textarea" },
        {
            title: "CUMPLIMIENTO INICIAL",
            columns: [
                {
                    title: "SI/NO", field: "cumplimientoI", editor: "list", editorParams: cumplimiento_opc,
                    hozAlign: "center", width: 178,
                    formatter: fun_cumplimiento
                },
            ],
        },
        {
            title: "Calificación (0-4)", field: "calficacionI", editor: "list", editorParams: calificaion_opc,
            hozAlign: "center", cellEdited: fun_calificaion, bottomCalc: "sum"
        },
        { title: "OBSERVACIÓN", field: "observacion", editor: "input", hozAlign: "center" },
        {
            title: "CUMPLIMIENTO FINAL",
            columns: [
                {
                    title: "SI/NO", field: "cumplimientoF", editor: "list", editorParams: cumplimiento_opc,
                    hozAlign: "center", width: 178,
                    formatter: fun_cumplimiento
                },
            ],
        },
        {
            title: "Calificación (0-4)", field: "calficacionF", editor: "list", editorParams: calificaion_opc,
            hozAlign: "center", cellEdited: fun_calificaion, bottomCalc: "sum"
        },
    ],
    // rowUpdated: function (row) {
    //     // Convertir el valor de la celda a número cuando se actualiza la fila        
    //     let data = row.getData();
    //     if (!isNaN(data.calficacionI)) {
    //         data.calficacionI = Number(data.calficacionI);
    //     }
    // }
    // groupBy: "calficacionI",    
}


$(document).ready(function () {
    // let tabla    
    var tabla

    (async () => {
        let ruta = "formato_diagnostico/list/id";
        const jsonData = await objUtilidades.fetchResultListar(ruta);

        if (jsonData.message == "success") {
            // console.log(jsonData)
            tableData = jsonData.rows[3].contenido
            opciones.data = tableData
            tabla = new Tabulator("#example-table", opciones);
        } else {
            Swal.fire({
                title: "Error",
                text: "Algo salio mal al cargar la información",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    })();

    // $("#btn_p").on("click", function () {

    //     try {
    //         console.log($("#nn").val())
    //         const opciones = JSON.parse($("#nn").val());

    //         // Inicializar Tabulator con las opciones
    //         tabla = new Tabulator("#example-table", opciones);
    //     } catch (e) {
    //         alert("Las opciones ingresadas no son válidas JSON. Por favor, corrígelas.");
    //     }
    // })        

    $("#reactivity-add").on("click", function () {
        console.log('hasd')
        if (tableData) {
            tableData.push({
                lineamientos: "", indicador: "", cumplimientoI: "", calficacionI: "",
                observacion: "", cumplimientoF: "", calficacionF: ""
            });
        }
    });

    $("#btn_d").on("click", function () {
        if (tabla) { // Verifica si la tabla ha sido inicializada
            console.log(tabla.getData()); // Obtiene los datos de la tabla
            // console.log('Datos de la tabla:', table.getSheetData()); // Obtiene los datos de la tabla
        } else {
            alert("La tabla no ha sido inicializada aún.");
        }
    });

    $("#btn-guardar").on("click", async function () {
        if (tabla) {
            let dataTable = tabla.getData()
            if (dataTable.length == 0)
                return

            const data_diagnostico = {
                "contenido": dataTable
            }

            const jsonData = await objUtilidades.fetchResultGuardar(
                "diagnostico/create",
                data_diagnostico,
            );

            console.log('data ', jsonData)

        } else {
            alert("La tabla no ha sido inicializada aún.");
        }
    });
})
