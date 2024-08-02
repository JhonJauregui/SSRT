import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../../config/sequelize.db.js'

function FormatoDiagnostico() {
    return sequelize.define('formato_diagnostico', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        diagnostico_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'formato_diagnostico',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "fk_diagnostico",
                using: "BTREE",
                fields: [
                    { name: "diagnostico_id" },
                ]
            },
        ]
    });
};

export default FormatoDiagnostico
