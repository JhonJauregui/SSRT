import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../../config/sequelize.db.js'

function Diagnostico() {
    return sequelize.define('diagnostico', {
        diagnostico_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        diagnostico_inspector: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        diagnostico_revision: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.fn('current_timestamp')
        }
    }, {
        sequelize,
        tableName: 'diagnostico',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "diagnostico_id" },
                ]
            },
        ]
    });
};

export default Diagnostico
