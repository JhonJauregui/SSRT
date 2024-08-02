import pool from "../../config/conection-db.js";

class CD_FormatoDiagnostico {

    //CREATE
    async createFormatoDiagnostico(data) {
        let message = "success";
        let rows = [];
        try {
            [rows] = await pool.query(
                "INSERT INTO formato_diagnostico (contenido,diagnostico_id) VALUES (?,?)",
                [JSON.stringify(data.contenido), data.diagnostico_id]
            );
        } catch (error) {
            message = "Algo salió mal en CD: " + error.message;
        }
        return { message, rows };
    }

    //GET FORMATO DIAGNOSTICO BY ID
    async getFormatoDiagnosticoById(id) {
        let message = "success";
        let rows = [];
        try {
            [rows] = await pool.query(
                "SELECT * FROM `formato_diagnostico` WHERE 1"
            );
        } catch (error) {
            message = "Algo salió mal en CD: " + error.message;
        }
        return { message: message, rows: rows };
    }
}

export default CD_FormatoDiagnostico;