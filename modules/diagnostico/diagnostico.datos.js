import pool from "../../database/conection-db.js";

class CD_Diagnostico {

    //CREATE
    async createDiagnostico(data) {
        let message = "success";
        let rows = [];
        try {
            [rows] = await pool.query(
                "INSERT INTO diagnostico (diagnostico_inspector, diagnostico_revision) VALUES (?, ?)",
                ["Juan Carlos Astuvilca Camarena", "Rev. 1"]
            );
        } catch (error) {
            message = "Algo salió mal en CD: " + error.message;
        }
        return { message, rows };
    }

    //GET DIAGNOSTICO BY ID
    async getDiagnosticoById(id) {
        let message = "success";
        let rows = [];
        try {
            [rows] = await pool.query(
                "SELECT * FROM diagnostico WHERE 1"
            );
        } catch (error) {
            message = "Algo salió mal en CD: " + error.message;
        }
        return { message: message, rows: rows };
    }
}

export default CD_Diagnostico;