import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface AccessesAttributes {
    id_access: number;
    name: string;
    is_active: boolean;
}

class Access extends Model<AccessesAttributes> implements AccessesAttributes {
    public id_access!: number;
    public name!: string;
    public is_active!: boolean;
}

Access.init(
    {
        id_access: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'Access',
        tableName: 'accesses',
        timestamps: false,
    }
)

export default Access;