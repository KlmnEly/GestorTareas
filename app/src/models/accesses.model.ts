import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface AccessesAttributes {
    id_access: number;
    role_id?: number;
    username: string;
    password: string;
    is_active: boolean;
}

class Access extends Model<AccessesAttributes> implements AccessesAttributes {
    public id_access!: number;
    public role_id?: number;
    public username!: string;
    public password!: string;
    public is_active!: boolean;
}

Access.init(
    {
        id_access: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'roles',
                key: 'id_role',
            },
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
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